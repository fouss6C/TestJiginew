import { View,  ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputMoney from '../../components/TextInputMoney'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import ListOptionSelected from '../../components/ListOptionSelected'
import prestationTypes from '../../assets/data/DemandesAchatPrestationTypes'
import bcStatus from '../../assets/data/CommandesStatus'
import providers from '../../assets/data/ProvidersList'
import TextInput from '../../components/TextInput'
import Text from '../../components/Text'
import { Typography } from '../../theme/typography'
import colors from '../../theme/colors'
import font from '../../theme/font'
import SelectOptionModal from '../../components/SelectOptionModal'
import Button from '../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import SearchModal from '../../components/SearchModal'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'
import axios from 'axios'
import { BaseURL } from '../../assets/config/config'
import { AuthContext } from '../Context/AuthContextProvider'

type formData = {
    amountTTC: string | Float
    amountHT: string | Float 
    name: string
    reference: string
    bcNumber : string 
    daNumber : string 
    providedBy : string
    motivation : string
    project: string
    status: string 
    prestationType: string 
}

const DaEditScreen = () => {
    const insets = useSafeAreaInsets()
    const { userToken } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const route = useRoute()
    const [item , setItem] = useState(route?.params?.item)
    const navigation = useNavigation()
    
    // input item hooks 
    const {control, handleSubmit , watch , reset , setValue } = useForm<formData>( { 
      defaultValues : { 
        amountTTC : item.amountTTC , 
        amountHT : item.amountHT,
        name : item.name, 
        bcNumber : item.bcNumber,
        daNumber : item.daNumber,
        reference : item.reference ,
        motivation : item.motivation ,
        project : item.project.projectNumber , 
      }})
    // choice item hooks

    const [projects , setProjects] = useState([])
    const [providers , setProviders] = useState([])

    const [loadingProject , setLoadingProject] = useState(true)
    const [loadingProvider , setLoadingProvider] = useState( true )

    const [prestationTypeSelected , setPrestationTypeSelected]=useState(item.prestationType)
    const [providerSelected , setProviderSelected] = useState(item.providedBy)
    const [projectSelected , setProjectSelected] = useState('')
    //Modals visibility configs 
  
    const [prestationTypeModalVisible, setPrestationTypeModalVisible] = useState(false)
    const [providerModalVisible, setProviderModalVisible] = useState(false)
    const [projectModalVisible, setProjectModalVisible] = useState(false)

   
    
    
    useEffect(()=> {
        setValue('project',projectSelected.projectNumber)
    } , [projectSelected])

    useEffect(() => {
      if (route?.params?.item) {
        setItem(route?.params?.item)
        //console.log ( item )
        navigation.setOptions({
          headerTitle : route?.params?.item.daNumber ? 'DA '+ route?.params?.item.daNumber : route?.params?.item.reference 
        })
      }

      // get list of providers and bcStatus 

  }, [route?.params?.item])

  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/projets/projectIDs`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        //console.log (res.data)
        const formatDaList = () => {
          return res.data.map((item) => 
            {
              let x = { 
                  id : item.id,
                  iconName: item.id ==1 ? 'plus-circle' : 'minus-circle' ,
                  iconColor: item.id < 4 ? colors.primary : colors.secondary,
                  tag : item.projectID, 
                  text : item.name,
              }
              return x
            }
          )
        }
        setProjects(formatDaList)
        setLoadingProject ( false )

      }).catch((error)=> {
        if( error.code == 'ERR_BAD_REQUEST') {
          //Alert.alert( 'No response from server , check the URL ..')
          console.log(error.message)
        } else {
         // Alert.alert(error.message)
         console.log(error.message)
        }
        console.log(error.code)
      }).then( function () {
        //
      })
    }
    response()
    setValue('project',projectSelected?.tag)
  }, [projectSelected])

  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/providers`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        //console.log (res.data)
        const formatProviderList = () => {
          return res.data.map((item) => 
            {
              let x = { 
                id : item.id,
                iconName: item.id ==1 ? 'plus-circle' : 'minus-circle' ,
                iconColor: colors.primary,
                tag : item.tag, 
                text : item.name, 
                description : item.address,
              }
              return x
            }
          )
        }
        setProviders(formatProviderList)
        setLoadingProvider( false )
      }).catch((error)=> {
        if( error.code == 'ERR_BAD_REQUEST') {
          //Alert.alert( 'No response from server , check the URL ..')
          console.log(error.message)
        } else {
         // Alert.alert(error.message)
         console.log(error.message)
        }
      }
      ).then( function () {
        //
      })
    }
    response()
  }, [])

    const onPrestationTypeSelect = (option) => {
      setPrestationTypeSelected(option)
      setPrestationTypeModalVisible(false)
    }
    const onProviderSelect = (option) => {
      setProviderSelected(option)
      setProviderModalVisible(false)
    }
    const onProjectSelect = (option) => {
        setProjectSelected(option)
        setProjectModalVisible(false)
    }

    const submitBcForm = async ({ amountTTC , amountHT , name , bcNumber , daNumber , motivation , project, prestationType }: formData) => {
      if (loading) { return }
        setLoading(true)
      try {
        await console.log('this is parameter ', 
        bcNumber + daNumber + name + 
        prestationType +  motivation  + amountTTC + amountHT + providerSelected.tag , projectSelected.tag + project.tag )
      } catch ( e ) {
        Alert.alert ( " Erreur de creation : ", (e as Error ).message )
  
      } finally {
        setLoading(false)
      }
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          // Paddings to handle safe area
          //paddingTop: insets.top,
          //paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <View style = { styles.container }>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
              marginTop: 5
            }}
          >
            <Controller
                control={control}
                name='amountTTC'
                rules={{
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInputMoney 
                        styleContainer = {{
                          marginVertical: 2,
                          height: 'auto',
                          fontSize: 16,
                          textAlign: 'center',
                          borderWidth : 0.3,
                          borderColor : colors.border
                        }}
                        textAlign = {'center'}
                        inputStyle={Typography.title2}
                        //placeholder='XOF Montant TTC'
                        value={value }
                        onChange={onChange}
                        onBlur={onBlur}
                        defaultValue = { item.amountTTC}
                    />
                      {error && (
                        <Text style={{}}>
                          {error.message || "Error"}
                        </Text>
                      )} 
                  </>
                )}
            />
          </View>
          <ScrollView style = {{ flex : 1 , width: '100%' , paddingHorizontal: 5, marginTop : 20}}>
            <View style = {{ }}>
              <Text body1 primary>
                Objet : 
              </Text>
              <Controller
                control={control}
                name='name'
                rules={{
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                        style={{
                          marginTop: 2,
                          height: 'auto',
                          paddingVertical: 5,
                          fontSize: font.size.s,
                          borderWidth : 0.3,
                          borderColor : colors.border,
                          borderRadius : 1,
                        }}
                        inputStyle={Typography.body1}
                        //minHeight={120}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'Objet de la commande '}
                        placeholderTextColor={colors.gray}
                        value={value as string}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        maxLength = { 40 }
                    />
                      {error && (
                        <Text style={{}}>
                          {error.message || "Error"}
                        </Text>
                      )} 
                  </>
                )}
              /> 
            </View>
            <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                Reference
              </Text>
              <Controller
                control={control}
                name='reference'
                rules={{
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                        style={{
                          marginTop: 2,
                          height: 'auto',
                          paddingVertical: 5,
                          fontSize: font.size.s,
                          borderWidth : 0.3,
                          borderColor : colors.border,
                          borderRadius : 1,
                        }}
                        inputStyle={Typography.body1}
                        //minHeight={120}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'11111'}
                        placeholderTextColor={colors.gray}
                        value={value as string}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        //minLength = { 5 }
                        maxLength = { 7 }
                    />
                      {error && (
                        <Text style={{}}>
                          {error.message || "Error"}
                        </Text>
                      )} 
                  </>
                )}
              /> 
            </View>
            <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                Montant HT
              </Text>
              <Controller
                control={control}
                name='amountHT'
                rules={{
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInputMoney 
                      styleContainer = {{
                        marginTop: 2,
                        height: 'auto',
                        //paddingVertical: 1,
                        fontSize: font.size.s,
                        borderWidth : 0.3,
                        borderColor : colors.border
                      }}
                      styleText={{marginLeft : 'auto', }}
                      inputStyle={Typography.body2}
                      //placeholder='XOF Montant HT'
                      valu={value} 
                      defaultValue= { item.amountHT}
                      onChange={onChange}
                    />
                      {error && (
                        <Text style={{}}>
                          {error.message || "Error"}
                        </Text>
                      )} 
                  </>
                )}
              /> 
            </View>
            <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                Numero DA 
              </Text>
              <Controller
                control={control}
                name='daNumber'
                rules={{
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                        style={{
                          marginTop: 2,
                          height: 'auto',
                          paddingVertical: 5,
                          fontSize: font.size.s,
                          borderWidth : 0.3,
                          borderColor : colors.border,
                          borderRadius : 1,
                        }}
                        inputStyle={Typography.body1}
                        //minHeight={120}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'11111'}
                        placeholderTextColor={colors.gray}
                        value={value as string}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        //minLength = { 5 }
                        maxLength = { 7 }
                        keyboardType = "numeric"
                    />
                      {error && (
                        <Text style={{}}>
                          {error.message || "Error"}
                        </Text>
                      )} 
                  </>
                )}
              /> 
            </View>
            <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                Numero BC 
              </Text>
              <Controller
                control={control}
                name='bcNumber'
                rules={{
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                        style={{
                          marginTop: 2,
                          height: 'auto',
                          paddingVertical: 5,
                          fontSize: font.size.s,
                          borderWidth : 0.3,
                          borderColor : colors.border,
                          borderRadius : 1,
                        }}
                        inputStyle={Typography.body1}
                        //minHeight={120}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'22222'}
                        placeholderTextColor={colors.gray}
                        value={value as string}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        //minLength = { 5 }
                        maxLength = { 7 }
                        keyboardType = "numeric"
                    />
                      {error && (
                        <Text style={{}}>
                          {error.message || "Error"}
                        </Text>
                      )} 
                  </>
                )}
              /> 
            </View>
            <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                Ligne Budgetaire 
              </Text>
              <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    //marginVertical : 5,
                }}
              >
                    <Controller
                        control={control}
                        name='project'
                        rules={{
                        }}
                        render={({
                        field: { value, onChange, onBlur },
                        fieldState: { error },
                        }) => (
                        <>
                            <TextInput
                                style={{
                                marginTop: 2,
                                height: 'auto',
                                paddingVertical: 5,
                                fontSize: font.size.s,
                                borderWidth : 0.3,
                                borderColor : colors.border,
                                borderRadius : 1,
                                flex : 1
                                }}
                                inputStyle={Typography.body1}
                                //minHeight={120}
                                onChangeText={onChange}
                                textAlignVertical="top"
                                multiline={true}
                                autoCorrect={false}
                                placeholder={'PR1111'}
                                placeholderTextColor={colors.gray}
                                value={value as string}
                                onBlur={onBlur}
                                selectionColor={colors.primary}
                                numberOfLines={1}
                                //minLength = { 5 }
                                maxLength = { 10 }
                            />
                            {error && (
                                <Text style={{}}>
                                {error.message || "Error"}
                                </Text>
                            )} 
                            </>
                        )}
                    />
                <TouchableOpacity 
                    style={{ paddingLeft: 5 }} 
                    onPress={() => setProjectModalVisible(true)}
                >
                    <IconMaterial name="filter-menu-outline" size={24} color={colors.primary} />
                </TouchableOpacity>
                </View>
              </View>

              <ListOptionSelected
                style={{ marginTop: 10 }}
                textLeft={'Type Prestation'}
                textRight={prestationTypeSelected?.text }
                onPress={() =>{
                  setPrestationTypeModalVisible(true)
                }}
                primary
              />
              
              <ListOptionSelected
                style={{ marginTop: 10 }}
                textLeft={'Fournisseur'}
                textRight={providerSelected?.text || providerSelected?.name}
                onPress={() =>
                  setProviderModalVisible(true)
                }
                primary
              />
              
            <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                Motivation
              </Text>
              <Controller
                control={control}
                name='motivation'
                rules={{
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                        style={{
                          marginTop: 2,
                          height: 'auto',
                          paddingVertical: 5,
                          fontSize: font.size.s,
                          borderWidth : 0.3,
                          borderColor : colors.border,
                          borderRadius : 1,
                        }}
                        inputStyle={Typography.body1}
                        minHeight={100}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'Description du projet..'}
                        placeholderTextColor={colors.gray}
                        value={value as string }
                        selectionColor={colors.primary}
                        numberOfLines={8}
                    />
                      {error && (
                        <Text style={{}}>
                          {error.message || "Error"}
                        </Text>
                      )} 
                  </>
                )}
              /> 
            </View>
              
          </ScrollView>
          <Button
            style={{ marginHorizontal: 5, marginVertical: 20 }}
            onPress={handleSubmit(submitBcForm)}
            //outline
            loading={loading}
            round
          >
          {'Soumettre'}
          </Button>
        </View>

        <SelectOptionModal
          isVisible={prestationTypeModalVisible}
          options={prestationTypes}
          onChange = {onPrestationTypeSelect}
          onSwipeComplete={() => setPrestationTypeModalVisible(false)}
        />
        {
          !loadingProvider ?

            (<SearchModal
              isVisible={providerModalVisible}
              options={providers}
              onChange = {onProviderSelect}
              onSwipeComplete={() => setProviderModalVisible(false)}
            />) :
            (
              <>
              </>
            )
        }
        
        {
          !loadingProject ? 
              (<SearchModal
                isVisible={projectModalVisible}
                options={projects}
                onChange = {onProjectSelect}
                onSwipeComplete={() => setProjectModalVisible(false)}
              />) : 
              (
                <>
                </>
              )
        }
      </View>
    )
}
export default DaEditScreen