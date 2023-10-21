import { View,  ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputMoney from '../../components/TextInputMoney'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import ListOptionSelected from '../../components/ListOptionSelected'
import bcTypes from '../../assets/data/CommandesTypes'
import providers from '../../assets/data/ProvidersList'
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
import DaNumbers from '../../assets/data/DemandesNumbers'
import SearchModal from '../../components/SearchModal'
import MonthYearPicker from '../../components/MonthlyYearPicker'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'


type formData = {
  amountTTC: string | Float
  name: string
  bcNumber : string 
  daNumber : string 
  bcType : string
  provider : string
  description: string
  notifcationUrl : string
}

const BcFormScreen = () => {
    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    // input item hooks 
    const {control, handleSubmit , watch , reset , setValue } = useForm<formData>( { defaultValues : { amountTTC : 500000}})
    // choice item hooks
    const [bcTypeSelected , setBcTypeSelected]=useState(bcTypes[0])
    const [providerSelected , setProviderSelected] = useState(providers[0])
    const [daNumberSelected , setDaNumberSelected] = useState(DaNumbers[0])
    const [ deadline  , setDeadline ] = useState('')
    const [ notification , setNotification] = useState()
    //Modals visibility configs 
    const [bcTypeModalVisible, setBcTypeModalVisible] = useState(false)
    const [providerModalVisible, setProviderModalVisible] = useState(false)
    const [daNumberModalVisible, setDaNumberModalVisible] = useState(false)
    
    useEffect(()=> {
        setValue('daNumber',daNumberSelected.tag)
    } , [daNumberSelected])

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
      try {
       // const response = await Auth.signUp ({username , password , attributes : { name , email , phone_number}})
        //navigation.navigate('Confirm email', {username});
        await console.log('this is parameter ', bcNumber + daNumber + name + amountTTC + deadline + notification+ bcTypeSelected.tag + providerSelected.tag , daNumberSelected.tag)
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
                        value={value}
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
        </View>
        <SelectOptionModal
          isVisible={bcTypeModalVisible}
          options={bcTypes}
          onChange = {onBcTypeSelect}
          onSwipeComplete={() => setBcTypeModalVisible(false)}
        />
        <SearchModal
          isVisible={providerModalVisible}
          options={providers}
          onChange = {onProviderSelect}
          onSwipeComplete={() => setProviderModalVisible(false)}
        />
        <SearchModal
            isVisible={daNumberModalVisible}
            options={DaNumbers}
            onChange = {onDaNumberSelect}
            onSwipeComplete={() => setDaNumberModalVisible(false)}
        />
      </View>
    )
}
export default BcFormScreen