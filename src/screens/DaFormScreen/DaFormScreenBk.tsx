import { View,  ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputMoney from '../../components/TextInputMoney'
import styles from './styles'
import ListOptionSelected from '../../components/ListOptionSelected'
import prestationTypes from '../../assets/data/DemandesAchatPrestationTypes'
import TextInput from '../../components/TextInput'
import Text from '../../components/Text'
import {Typography}  from '../../theme/typography'
import colors from '../../theme/colors'
import font from '../../theme/font'
import SelectOptionModal from '../../components/SelectOptionModal'
import SearchOptionModal from '../../components/SearchModal'
import Button from '../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'
import { AuthContext } from '../Context/AuthContextProvider'
import axios from 'axios'
import { BaseURL } from '../../assets/config/config'


type formData = {
  amountTTC: string | Float
  name: string
  amountHT : string | Float
  motive : string 
  prestation : string
  provider : string 
  account : string 
}

const DaFormScreen = () => {
    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    const [loadingProvider, setLoadingProvider] = useState(true)
    const [loadingProject, setLoadingProject] = useState(true)

    const { userToken } = useContext(AuthContext)
    // input item hooks 
    const {control, handleSubmit } = useForm<formData>({defaultValues : { amountTTC : 500000 }})
    // choice item hooks
    const [projectID , setProjectID] = useState([])
    const [provider , setProvider ] = useState([])

    const [prestationSelected , setPrestationSelected]=useState(prestationTypes[0])
    const [providerSelected , setProviderSelected] = useState('')
    const [accountSelected , setAccountSelected] = useState('')

    //Modals visibility configs 
    const [prestationModalVisible, setPrestationModalVisible] = useState(false)
    const [providerModalVisible, setProviderModalVisible] = useState(false)
    const [accountModalVisible, setAccountModalVisible] = useState(false)


    useEffect( () => {
      setLoadingProject(true)
      const response = async () => {
        await axios.get(`${BaseURL}/projets/projectIDs`,
      { headers: {
        //'Content-Type': 'multipart/form-data' , 
        'Authorization' : `Bearer ${userToken?.access_token}`,
        'Accept' : 'application/json'
      }}
      ).then(res => {
         
          const formatProjectList = () => {
            return res.data.map((item) => 
              {
                let x = { 
                  id : item.id,
                  iconName: item.id ==1 ? 'plus-circle' : 'minus-circle' ,
                  iconColor: colors.primary,
                  tag : item.projectID, 
                  text : item.name, 
                  description : item.name,
                }
                return x
              }
            )
          }
          setProjectID(formatProjectList)
          setLoadingProject(false)
          //setAccountSelected(formatProjectList[0])
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
         //setLoadingProject(false)

        })
      }
      response()
    }, [])

    useEffect( () => {
      setLoadingProvider(true)
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
          setProvider(formatProviderList)
          setLoadingProvider(false)
          //console.log(provider)
          //setProviderSelected (formatProviderList[0])

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
          //setLoadingProvider(false)
        })
      }
        response()
      
    }, [])

    useEffect(
      () => {
      const updateProvider = () => {
        if ( provider.length > 0 )
        setProviderSelected(v => provider[0])
      }
      updateProvider()
    }
    , [loadingProvider])

    useEffect(
      () => {
      const updateProject =  () => {
          if ( projectID.length > 0 )
          setAccountSelected(v => projectID[0])
      }
      updateProject()
    }
    ,[loadingProject]) 

    // set func for hooks 
    const onPrestationTypeSelect = (option) => {
      setPrestationSelected(option)
      setPrestationModalVisible(false)
    }
    const onProviderSelect = (option) => {
      setProviderSelected(option)
      setProviderModalVisible(false)
    }
    const onAccountSelect = (option) => {
      setAccountSelected(option)
      setAccountModalVisible(false)
    }


    const submitDaForm = async ({amountTTC , name , amountHT , motive }: formData) => {
      if (loading) { return }
        setLoading(true)

        const response =  async () => {
          await axios.post(`${BaseURL}/demandeAchats`, 
            {
              "amountTTC" : amountTTC,
              "amountHT" : amountHT , 
              "name" : name ,
              "motive" : motive ,
              "prestationType" : prestationSelected.text ,
              "projectID" : accountSelected.tag ,
              "createdBy" : userToken?.auth_user?.id , 
              "providedBy" : providerSelected.id , 
            },
          {
            
            headers: {
              'Authorization' : `Bearer ${userToken?.access_token}`,
              'Accept' : 'application/json'
            }
          }
  
        ).then(res => {
            Alert.alert('Demande Achat créée avec succès' , 'la demande '+ res.data?.reference + ' doit etre validée par le N+1')
            console.log ( res.data)
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
                        value={value as number}
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
                        placeholder={'Objet de la demande '}
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
                      value={value as number} 
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
            
              <ListOptionSelected
                style={{ marginTop: 15 }}
                textLeft={'Prestation'}
                textRight={prestationSelected?.text}
                onPress={() =>
                  setPrestationModalVisible(true)
                }
                primary
              />
              <ListOptionSelected
                style={{ marginTop: 15 }}
                textLeft={'Fournisseur'}
                textRight={providerSelected?.text || 'Select'}
                onPress={() =>
                  setProviderModalVisible(true)
                }
                primary
              />
              <ListOptionSelected
                style={{ marginTop: 15 }}
                textLeft={'Ligne Budgetaire'}
                textRight={accountSelected?.text || 'Select' }
                onPress={() =>
                  setAccountModalVisible(true)
                }
                primary
              />
          
            <View style = {{ marginTop : 15}}>
              <Text body1 primary >
                Motivation
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
                        minHeight={120}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'Motivation de la demande.. '}
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
            style={{ marginHorizontal: 5, marginBottom: 20 ,marginTop : 1 }}
            onPress={handleSubmit(submitDaForm)}
            //outline
            loading={loading}
            round
          >
          {'Soumettre'}
          </Button>
          </KeyboardAvoidingView>
        </View>
        <SelectOptionModal
          isVisible={prestationModalVisible}
          options={prestationTypes}
          onChange = {onPrestationTypeSelect}
          onSwipeComplete={() => setPrestationModalVisible(false)}
        />
        {
          !loadingProvider ? 
          (
          <SearchOptionModal
            isVisible={providerModalVisible}
            options={ provider }
            onChange = {onProviderSelect}
            onSwipeComplete={() => setProviderModalVisible(false)}
          />
          ) :
          (
            <>
            </>
          )

        }
        { !loadingProject ?
          (
          <SearchOptionModal
            isVisible={ accountModalVisible }
            options={ projectID }
            onChange = { onAccountSelect }
            onSwipeComplete={() => setAccountModalVisible(false)}
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
export default DaFormScreen