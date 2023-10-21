import { View,  ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputMoney from '../../components/TextInputMoney'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import ListOptionSelected from '../../components/ListOptionSelected'
import prestationTypes from '../../assets/data/DemandesAchatPrestationTypes'
import providers from '../../assets/data/ProvidersList'
import accounts from '../../assets/data/ProjectAccountList'
import TextInput from '../../components/TextInput'
import Text from '../../components/Text'
import { Typography } from '../../theme/typography'
import colors from '../../theme/colors'
import font from '../../theme/font'
import SearchOptionModal from '../../components/SearchModal'
import Button from '../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import { Float, Int32 } from 'react-native/Libraries/Types/CodegenTypes'

type formData = {
  amountTTC: string | Float
  name: string
  motive : string 
  fromProjectID : string
  toProjectID : string 
}

const TransferFormScreen = () => {
    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    // input item hooks 
    const {control, handleSubmit , watch , reset } = useForm<formData>({defaultValues : { amountTTC : 500000 , amountHT : 450000}})
    
    const [fromAccountSelected , setFromAccountSelected] = useState(accounts[0])
    const [toAccountSelected , setToAccountSelected] = useState(accounts[0])

    //Modals visibility configs 
    const [fromAccountModalVisible, setFromAccountModalVisible] = useState(false)
    const [toAccountModalVisible, setToAccountModalVisible] = useState(false)

    const onFromAccountSelect = (option) => {
      setFromAccountSelected(option);
      setFromAccountModalVisible(false);
    }
    const onToAccountSelect = (option) => {
        setToAccountSelected(option);
        setToAccountModalVisible(false);
      }

    const submitTransferForm = async ({amountTTC , name , motive }: formData) => {
      if (loading) { return }
        setLoading(true)
      try {
       // const response = await Auth.signUp ({username , password , attributes : { name , email , phone_number}})
        //navigation.navigate('Confirm email', {username});
        console.log('this is parameter ', name + amountTTC + motive + fromAccountSelected.tag + toAccountSelected.tag )
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
          <ScrollView style = {{ flex : 1 , width: '100%' , marginTop : 30}}>
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
                        placeholder={'Objet du transfert.. '}
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
              <ListOptionSelected
                style={{ marginTop: 15 }}
                textLeft={'Projet source '}
                textRight={fromAccountSelected?.text}
                onPress={() =>
                  setFromAccountModalVisible(true)
                }
                primary
              />
              <ListOptionSelected
                style={{ marginTop: 15 }}
                textLeft={'Projet destination '}
                textRight={toAccountSelected?.text}
                onPress={() =>
                  setToAccountModalVisible(true)
                }
                primary
              />
            <View style = {{ marginTop : 20}}>
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
                        minHeight={150}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'Motivation du transfert... '}
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
            style={{ marginHorizontal: 5, marginBottom: 20  }}
            onPress={handleSubmit(submitTransferForm)}
            //outline
            loading={loading}
            round
          >
          {'Soumettre'}
          </Button>
        </View>
        <SearchOptionModal
          isVisible={fromAccountModalVisible}
          options={accounts}
          onChange = {onFromAccountSelect}
          onSwipeComplete={() => setFromAccountModalVisible(false)}
        />
        <SearchOptionModal
          isVisible={toAccountModalVisible}
          options={accounts}
          onChange = {onToAccountSelect}
          onSwipeComplete={() => setToAccountModalVisible(false)}
        />
      </View>
    )
}
export default TransferFormScreen