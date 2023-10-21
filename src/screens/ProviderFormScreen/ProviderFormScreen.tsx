import { View,  ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputMoney from '../../components/TextInputMoney'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import ListOptionSelected from '../../components/ListOptionSelected'
import AccountTypes from '../../assets/data/AccountType'
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
import Domain from '../../assets/data/DomainProviders'

type formData = {
  name: string
  domain : string 
  address : string
}

const ProviderFormScreen = () => {

    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    // input item hooks 
    const {control, handleSubmit , watch , reset , setValue } = useForm<formData>( )
    // choice item hooks

    const [domainSelected , setDomainSelected]=useState(Domain[0])
    const [domainModalVisible, setDomainModalVisible] = useState(false)

    // set func for hooks 
    const onDomainSelect = (option) => {
      setDomainSelected(option)
      setDomainModalVisible(false)
    }

    const submitProviderForm = async ({ name , domain, address }: formData) => {
      if (loading) { return }
        setLoading(true)
      try {
       // const response = await Auth.signUp ({username , password , attributes : { name , email , phone_number}})
        //navigation.navigate('Confirm email', {username});
        await console.log('this is parameter ', + name + address + domain )
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
        <View style = { [styles.container , {justifyContent: 'center' , alignItems: 'center'}] }>
          <ScrollView style = {{ flex : 1 , width: '100%' , marginTop : 40}}>
            <View style = {{ }}>
              <Text body1 primary>
                Nom : 
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
                        placeholder={'Designation du Fournisseur '}
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
                style={{ marginTop: 10 }}
                textLeft={'Domaine Intervention'}
                textRight={domainSelected?.text}
                onPress={() =>{
                  setDomainModalVisible(true)
                }}
                primary
              />
            <View style = {{ marginTop : 50}}>
              <Text body1 primary >
                Adresse :
              </Text>
              <Controller
                control={control}
                name='address'
                rules={{
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                        style = {{
                          marginTop: 2,
                          height: 'auto',
                          paddingVertical: 5,
                          fontSize: font.size.s,
                          borderWidth : 0.3,
                          borderColor : colors.border,
                          borderRadius : 1,
                        }}
                        inputStyle={Typography.body1}
                        minHeight={130}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'Adresse du fournisseur ...'}
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
            style={{ marginHorizontal: 5, marginBottom: 20 }}
            onPress={handleSubmit(submitProviderForm)}
            //outline
            loading={loading}
            round
          >
          {'Soumettre'}
          </Button>
        </View>
        <SelectOptionModal
          isVisible={domainModalVisible}
          options={Domain}
          onChange = {onDomainSelect}
          onSwipeComplete={() => setDomainModalVisible(false)}
        />
      </View>
    )
}
export default ProviderFormScreen