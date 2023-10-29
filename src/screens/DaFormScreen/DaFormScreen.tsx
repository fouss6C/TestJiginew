import { View,  ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputMoney from '../../components/TextInputMoney'
import styles from './styles'
import ListOptionSelected from '../../components/ListOptionSelected'
import prestationTypes from '../../assets/data/DemandesAchatPrestationTypes'
import providers from '../../assets/data/ProvidersList'
import accounts from '../../assets/data/ProjectAccountList'
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
    // input item hooks 
    const {control, handleSubmit } = useForm<formData>({defaultValues : { amountTTC : 500000 }})
    // choice item hooks
    const [prestationSelected , setPrestationSelected]=useState(prestationTypes[0])
    const [providerSelected , setProviderSelected] = useState(providers[0])
    const [accountSelected , setAccountSelected] = useState(accounts[0])


    //Modals visibility configs 
    const [prestationModalVisible, setPrestationModalVisible] = useState(false)
    const [providerModalVisible, setProviderModalVisible] = useState(false)
    const [accountModalVisible, setAccountModalVisible] = useState(false)

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
      try {
       // const response = await Auth.signUp ({username , password , attributes : { name , email , phone_number}})
        //navigation.navigate('Confirm email', {username});
        await  console.log('this is parameter ', amountHT + name + amountTTC + motive + prestationSelected.tag + providerSelected.tag + accountSelected.tag )
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
                textRight={providerSelected?.text}
                onPress={() =>
                  setProviderModalVisible(true)
                }
                primary
              />
              <ListOptionSelected
                style={{ marginTop: 15 }}
                textLeft={'Ligne Budgetaire'}
                textRight={accountSelected?.text}
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
              {/* <View style={styles.viewImage}>
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
                  <Text subhead > Fichier Offre </Text>
                </TouchableOpacity>
              </View> */}
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
        </View>
        <SelectOptionModal
          isVisible={prestationModalVisible}
          options={prestationTypes}
          onChange = {onPrestationTypeSelect}
          onSwipeComplete={() => setPrestationModalVisible(false)}
        />
        <SearchOptionModal
          isVisible={providerModalVisible}
          options={providers}
          onChange = {onProviderSelect}
          onSwipeComplete={() => setProviderModalVisible(false)}
        />
        <SearchOptionModal
          isVisible={accountModalVisible}
          options={accounts}
          onChange = {onAccountSelect}
          onSwipeComplete={() => setAccountModalVisible(false)}
        /> 
      </View>
    )
}
export default DaFormScreen