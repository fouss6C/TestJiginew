import { View,  ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputMoney from '../../components/TextInputMoney'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import ListOptionSelected from '../../components/ListOptionSelected'
import bcTypes from '../../assets/data/CommandesTypes'
import bcStatus from '../../assets/data/CommandesStatus'
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
    name: string
    createdAt: string 
    purchaseAt: string 
    bcNumber : string 
    daNumber : string 
    bcType : string
    provider : string
    motive : string
    nextStep: string
    assets: string
    executionRate: number 
    savingRate: number 
    acceptanceRate: number
    status: string 
    jalon: string 
    deadline: string
    //notification : string
}

const BcEditScreen = () => {
    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    const { userToken } = useContext(AuthContext)
    const route = useRoute()
    const [item , setItem] = useState(route?.params?.item)
    
    // input item hooks 
    const {control, handleSubmit , watch , reset , setValue } = useForm<formData>( { 
      defaultValues : { 
        amountTTC : item.amountTTC , 
        name : item.name, 
        bcNumber : item.bcNumber,
        purchaseAt : item.purchasedAt,
        daNumber : item.da.daNumber,
        assets : item.assets ,
        motive : item.context ,
        nextStep : item.nextStep,
        executionRate : item.executionRate.toString() , 
        savingRate : item.savingRate.toString() ,
        acceptanceRate : item.acceptanceRate.toString() , 
        jalon : item.jalon,
        deadline : item.initialDeadline,
      }})
    // choice item hooks
    const [bcTypeSelected , setBcTypeSelected]=useState(bcTypes[0])
    const [bcStatusSelected , setBcStatusSelected]=useState(item.status)

    const [providers , setProviders] = useState ([])
    const [providerSelected , setProviderSelected] = useState(item.providedBy)
    const [loadingProvider , setLoadingProvider] = useState(true)
    const [daNumbers , setDaNumbers] = useState([])
    const [daNumberSelected , setDaNumberSelected] = useState(item?.da)
    const [ loadingDaNumber , setLoadingDaNumber] = useState(true)
    //const [ deadline  , setDeadline ] = useState(item.initialDeadline)
    //const [ notification , setNotification] = useState(item.purchasedAt)
    //Modals visibility configs 
    const [bcTypeModalVisible, setBcTypeModalVisible] = useState(false)
    const [bcStatusModalVisible, setBcStatusModalVisible] = useState(false)
    const [providerModalVisible, setProviderModalVisible] = useState(false)
    const [daNumberModalVisible, setDaNumberModalVisible] = useState(false)
    const navigation = useNavigation()
    
    
    useEffect(()=> {
        setValue('daNumber',daNumberSelected.daNumber)
    } , [daNumberSelected])

  useEffect(() => {
    if (route?.params?.item) {
      setItem(route?.params?.item)
      console.log ( item )
      navigation.setOptions({headerTitle :'BC '+ route?.params?.item.bcNumber})
    }

    // get list of providers and bcStatus 

  }, [route?.params?.item])

  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/demandeAchats/DaNumbers`,
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
                  tag : item.daNumber, 
                  text : item.name,
              }
              return x
            }
          )
        }
        setDaNumbers(formatDaList)
        setLoadingDaNumber ( false )
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
    setValue('daNumber',daNumberSelected?.tag)
  }, [daNumberSelected])

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



    // set func for hooks 
    const onBcTypeSelect = (option) => {
      setBcTypeSelected(option)
      setBcTypeModalVisible(false)
    }
    const onBcStatusSelect = (option) => {
      setBcStatusSelected(option)
      setBcStatusModalVisible(false)
    }
    const onProviderSelect = (option) => {
      setProviderSelected(option)
      setProviderModalVisible(false)
    }
    const onDaNumberSelect = (option) => {
        setDaNumberSelected(option)
        setDaNumberModalVisible(false)
    }

    const submitBcForm = async ({ amountTTC , name , bcNumber , purchaseAt , daNumber , motive , nextStep , executionRate , savingRate, acceptanceRate , jalon , assets, deadline}: formData) => {
      if (loading) { return }
        setLoading(true)
      try {
        await console.log('this is parameter ', executionRate + 
        savingRate + acceptanceRate + 
        bcNumber + daNumber + name + 
        jalon +  motive  + amountTTC + 
        deadline + purchaseAt + bcTypeSelected.tag + 
        providerSelected.tag , daNumberSelected.tag + nextStep +
         assets  )
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
                        placeholder={'245008'}
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
                Date de Notification  
              </Text>
              <Controller
                control={control}
                name='purchaseAt'
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
                        placeholder={'21-10-2023 00:00:00'}
                        placeholderTextColor={colors.gray}
                        value={value as string}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        //minLength = { 5 }
                        maxLength = { 7 }
                        //keyboardType = "numeric"
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

            {/* <View style = {{ marginTop : 10}}>
                <Text body1 primary >
                  Date Notification
                </Text>
                <MonthYearPicker
                  style={{ marginTop: 5 }}
                  onChange={(dateInline) => setNotification(dateInline)}
                />
            </View> */}
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
                                placeholder={'145008'}
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
              <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                HighLight 
              </Text>
              <Controller
                control={control}
                name='assets'
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
                        minHeight={50}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'Highligh de la semaine...'}
                        placeholderTextColor={colors.gray}
                        value={value as string }
                        selectionColor={colors.primary}
                        numberOfLines={3}
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
              <View style = {{ marginTop : 10 }}>
              <Text body1 primary>
                Next Step : 
              </Text>
              <Controller
                control={control}
                name='nextStep'
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
                        placeholder={'prochaine etape...'}
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
                Taux Realisation (%)
              </Text>
              <Controller
                control={control}
                name='executionRate'
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
                        placeholder={'98' + '%'}
                        placeholderTextColor={colors.gray}
                        value={value as string}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        //minLength = { 5 }
                        maxLength = { 2 }
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
                Taux Acceptance (%)
              </Text>
              <Controller
                control={control}
                name='acceptanceRate'
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
                        placeholder={'98' + '%'}
                        placeholderTextColor={colors.gray}
                        value={value as string}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        //minLength = { 5 }
                        maxLength = { 2 }
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
                Taux Immobilisation (%)
              </Text>
              <Controller
                control={control}
                name='savingRate'
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
                        placeholder={'98' + '%'}
                        placeholderTextColor={colors.gray}
                        value={value as number}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        //minLength = { 5 }
                        maxLength = { 2 }
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
                Jalon ( iTx )
              </Text>
              <Controller
                control={control}
                name='jalon'
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
                        placeholder={'it0'}
                        placeholderTextColor={colors.gray}
                        value={value as string}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        //minLength = { 5 }
                        maxLength = { 2 }
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
              <ListOptionSelected
                style={{ marginTop: 10 }}
                textLeft={'Statut BC'}
                textRight={bcStatusSelected?.text||bcStatusSelected?.status}
                onPress={() =>{
                  setBcStatusModalVisible(true)
                }}
                primary
              />
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
                textRight={providerSelected?.text || providerSelected?.name}
                onPress={() =>
                  setProviderModalVisible(true)
                }
                primary
              />
              
              <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                Date de clôture  
              </Text>
              <Controller
                control={control}
                name='deadline'
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
                        placeholder={'21-10-2023 00:00:00'}
                        placeholderTextColor={colors.gray}
                        value={value as string}
                        onBlur={onBlur}
                        selectionColor={colors.primary}
                        numberOfLines={1}
                        //minLength = { 5 }
                        maxLength = { 7 }
                        //keyboardType = "numeric"
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
                Contexte
              </Text>
              <Controller
                control={control}
                name='motive'
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
          isVisible={bcStatusModalVisible}
          options={bcStatus}
          onChange = {onBcStatusSelect}
          onSwipeComplete={() => setBcStatusModalVisible(false)}
        />
        <SelectOptionModal
          isVisible={bcTypeModalVisible}
          options={bcTypes}
          onChange = {onBcTypeSelect}
          onSwipeComplete={() => setBcTypeModalVisible(false)}
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
          !loadingDaNumber ? 

          (<SearchModal
            isVisible={daNumberModalVisible}
            options={daNumbers}
            onChange = {onDaNumberSelect}
            onSwipeComplete={() => setDaNumberModalVisible(false)}
          />) : 
          (
            <>
            </>
          )
        }
      </View>
    )
}
export default BcEditScreen