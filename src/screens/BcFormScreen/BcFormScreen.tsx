import { View,  ScrollView, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputMoney from '../../components/TextInputMoney'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import ListOptionSelected from '../../components/ListOptionSelected'
import bcTypes from '../../assets/data/CommandesTypes'
import TextInput from '../../components/TextInput'
import Text from '../../components/Text'
import { Typography } from '../../theme/typography'
import colors from '../../theme/colors'
import font from '../../theme/font'
import SelectOptionModal from '../../components/SelectOptionModal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import SearchModal from '../../components/SearchModal'
import MonthYearPicker from '../../components/MonthlyYearPicker'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'
import { BaseURL } from '../../assets/config/config'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContextProvider'

type formData = {
  amountTTC: string | Float
  name: string
  bcNumber : string 
  daNumber : string 
  bcType : string
  provider : string
  description: string
}

const BcFormScreen = () => {
    const insets = useSafeAreaInsets()
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 540 : 0
    const [loading, setLoading] = useState(false)

    const { userToken } =useContext(AuthContext)
    // input item hooks 
    const {control, handleSubmit , watch , reset , setValue } = useForm<formData>( { defaultValues : { amountTTC : 500000}})
    // choice item hooks
    const [bcTypeSelected , setBcTypeSelected]=useState(bcTypes[0])
    const [providers , setProviders] = useState([])
    const [providerSelected , setProviderSelected] = useState('')
    const [loadingProvider , setLoadingProvider] = useState(true)

    const [daNumbers , setDaNumbers] = useState([])
    const [daNumberSelected , setDaNumberSelected] = useState('')
    const [loadingDaNumber , setLoadingDaNumber] = useState(true)

    const [ deadline  , setDeadline ] = useState('')
    const [ notification , setNotification] = useState('')
    //Modals visibility configs 
    const [bcTypeModalVisible, setBcTypeModalVisible] = useState(false)
    const [providerModalVisible, setProviderModalVisible] = useState(false)
    const [daNumberModalVisible, setDaNumberModalVisible] = useState(false)
    

    useEffect( () => {
      const response = async () => {
        await axios.get(`${BaseURL}/demandeAchats/DaNumbers`,
      { headers: {
        //'Content-Type': 'multipart/form-data' , 
        'Authorization' : `Bearer ${userToken?.access_token}`,
        'Accept' : 'application/json'
      }}
      ).then(res => {
          console.log (res.data)
          const formatDaList = () => {
            return res.data.map((item) => 
              {
                let x = { 
                    id : item.id,
                    iconName: item.id ==1 ? 'plus-circle' : 'minus-circle' ,
                    iconColor: item.id < 4 ? colors.primary : colors.secondary,
                    tag : item.daNumber, 
                    text : item.name,
                }
                return x
              }
            )
          }
          setDaNumbers(formatDaList)
          setLoadingDaNumber(false)

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
          //setLoadingDaNumber(false)
        })
      }
      response()
      
    }, [])

    useEffect(
      () => {
      const updateDaNumbers = () => {
        if ( daNumbers.length > 0 )
        setDaNumberSelected(v => daNumbers[0])
      }
      updateDaNumbers()
    }
    , [loadingDaNumber])

    useEffect( () => {
      const response = async () => {
        await axios.get(`${BaseURL}/providers`,
      { headers: {
        //'Content-Type': 'multipart/form-data' , 
        'Authorization' : `Bearer ${userToken?.access_token}`,
        'Accept' : 'application/json'
      }}
      ).then(res => {
          console.log (res.data)
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
          setLoadingProvider(false)
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

    useEffect(
      () => {
      const updateProvider = () => {
        if ( providers.length > 0 )
        setProviderSelected(v => providers[0])
      }
      updateProvider()
    }
    , [loadingProvider])
    useEffect (
      ()=> 
      {
        setValue('daNumber', daNumberSelected.tag)
      },
    [daNumberSelected])

    // set func for hooks 
    const onBcTypeSelect = (option) => {
      setBcTypeSelected(option)
      setBcTypeModalVisible(false)
    }
    const onProviderSelect = (option) => {
      setProviderSelected(option)
      setProviderModalVisible(false)
    }
    const onDaNumberSelect = (option) => {
        setDaNumberSelected(option)
        setDaNumberModalVisible(false)
    }
    
    const submitBcForm = async ({amountTTC , name , bcNumber , daNumber , description }: formData) => {
      if (loading) { return }
        setLoading(true)

        const response =  async () => {
          await axios.post(`${BaseURL}/bonCommandes`, 
            {
              "amountTTC" : amountTTC,
              "name" : name ,
              "bcNumber" : bcNumber,
              "daNumber" : daNumberSelected.tag ,
              "bcType" : bcTypeSelected.tag,
              "createdBy" : userToken?.auth_user?.id , 
              "providedBy" : providerSelected.id , 
              "description" : description,
              "purchasedAt" : new Date (notification),
              "initialDeadline" : new Date (deadline)
            },
          { 
            headers: {
              'Authorization' : `Bearer ${userToken?.access_token}`,
              'Accept' : 'application/json'
            }
          }
        ).then(res => {
            Alert.alert('Bon de commande créé avec succès' , 'la demande '+ res.data?.bcNumber + ' CCCC ')
            //console.log ( res.data)
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
            setLoading(false)
          })
        }
        response()
      
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
        <KeyboardAvoidingView style = {{ flex : 1}} behavior={Platform.OS ==='ios' ? "padding" : "height"}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
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
                        value={value as number }
                        onChange={onChange}
                        onBlur={onBlur}
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
          
          <ScrollView style = {{ flex : 1 , width: '100%' , marginTop : 20}}>
          
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
                Numero DA 
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
                                flex : 1
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
                <TouchableOpacity 
                    style={{ paddingLeft: 5 }} 
                    onPress={() => setDaNumberModalVisible(true)}
                >
                    <IconMaterial name="filter-menu-outline" size={24} color={colors.primary} />
                </TouchableOpacity>
                </View>
              
            </View>
              <ListOptionSelected
                style={{ marginTop: 10 }}
                textLeft={'Type BC'}
                textRight={bcTypeSelected?.text}
                onPress={() =>{
                  setBcTypeModalVisible(true)
                }}
                primary
              />
              <ListOptionSelected
                style={{ marginTop: 10 }}
                textLeft={'Fournisseur'}
                textRight={providerSelected?.text}
                onPress={() =>
                  setProviderModalVisible(true)
                }
                primary
              />
              <View style = {{ marginTop : 10}}>
                <Text body1 primary >
                  Notification BC
                </Text>
                <MonthYearPicker
                  style={{ marginTop: 5 }}
                  onChange={(dateInline) => setNotification(dateInline)}
                />
              </View>
              <View style = {{ marginTop : 10}}>
                <Text body1 primary >
                  DeadLine 
                </Text>
                <MonthYearPicker
                  style={{ marginTop: 5 }}
                  onChange={(dateInline) => setDeadline (dateInline)}
                />
              </View>
            
            <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                Contexte
              </Text>
              <Controller
                control={control}
                name='description'
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
              <View style={styles.viewImage}>
                <TouchableOpacity
                  style={[
                    styles.image,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 0.3,
                      borderStyle: 'dotted',
                      borderColor: colors.primary,
                    },
                  ]}
                >
                  <Icon name="plus-circle" size={24} color={colors.primary} />
                  <Text subhead > Fichier BC </Text>
                </TouchableOpacity>
              </View>
              
          </ScrollView>
          
          <Button
            style={{ marginHorizontal: 5, marginBottom: 20 }}
            onPress={handleSubmit(submitBcForm)}
            //outline
            loading={loading}
            round
          >
          {'Soumettre'}
          </Button>
          </KeyboardAvoidingView>
        </View>
        <SelectOptionModal
          isVisible={bcTypeModalVisible}
          options={bcTypes}
          onChange = {onBcTypeSelect}
          onSwipeComplete={() => setBcTypeModalVisible(false)}
        />
        {
          !loadingProvider ?
          (
          <SearchModal
            isVisible={providerModalVisible}
            options={providers}
            onChange = {onProviderSelect}
            onSwipeComplete={() => setProviderModalVisible(false)}
          />
          ) :
          (
            <>
            </>
          )
        }
        {
          !loadingDaNumber ?
          (
            <SearchModal
              isVisible={daNumberModalVisible}
              options={daNumbers}
              onChange = {onDaNumberSelect}
              onSwipeComplete={() => setDaNumberModalVisible(false)}
            />

          ) :
          (
            <>
            </>
          )
        }
      </View>
    )
}
export default BcFormScreen