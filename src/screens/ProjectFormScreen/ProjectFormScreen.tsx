import { View,  ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputMoney from '../../components/TextInputMoney'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import ListOptionSelected from '../../components/ListOptionSelected'
import ProjectTypes from '../../assets/data/ProjectLineType'
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
import actIDs from '../../assets/data/AccountNumbersList'
import SearchModal from '../../components/SearchModal'
import MonthYearPicker from '../../components/MonthlyYearPicker'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'


type formData = {
  amountTTC: string | Float
  amountHT : string | Float
  name: string
  actID : string 
  projectID : string 
  type : string
  motive: string
}

const ProjectFormScreen = () => {
    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    // input item hooks 
    const {control, handleSubmit , watch , reset , setValue } = useForm<formData>( { defaultValues : { amountTTC : 500000}})
    // choice item hooks
    const [typeSelected , setTypeSelected]=useState(ProjectTypes[0])
    const [actIDSelected , setactIDSelected] = useState(actIDs[0])
    //Modals visibility configs 
    const [typeModalVisible, setTypeModalVisible] = useState(false)
    const [actIDModalVisible, setactIDModalVisible] = useState(false)

    const [optionChoosed, setOptionChoosed] = useState()
    const navigation = useNavigation();
    
    useEffect(()=> {
        setValue('actID',actIDSelected.tag)
    } , [actIDSelected])

    // set func for hooks 
    const onTypeSelect = (option) => {
      setTypeSelected(option)
      setTypeModalVisible(false)
    }
    const onactIDSelect = (option) => {
        setactIDSelected(option)
        setactIDModalVisible(false)
    }
    

    const goDaSearchScreen = () => {

    }

    const submitProjectForm = async ({amountTTC , amountHT ,  name , projectID , actID , motive }: formData) => {
      if (loading) { return }
        setLoading(true)
      try {
       // const response = await Auth.signUp ({username , password , attributes : { name , email , phone_number}})
        //navigation.navigate('Confirm email', {username});
        await console.log('this is parameter ', projectID + actID + name + amountTTC + amountHT + typeSelected.tag + actIDSelected.tag)
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
                        placeholder={'Designation de l\'Investissement'}
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
                      placeholder='XOF Montant HT'
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
            <View style = {{ marginTop : 10}}>
              <Text body1 primary >
                Identifiant projet
              </Text>
              <Controller
                control={control}
                name='projectID'
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
                Numero de compte
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
                        name='actID'
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
                                placeholder={'25008'}
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
                    onPress={() => setactIDModalVisible(true)}
                >
                    <IconMaterial name="filter-menu-outline" size={24} color={colors.primary} />
                </TouchableOpacity>
                </View>
              
            </View>
              <ListOptionSelected
                style={{ marginTop: 10 }}
                textLeft={'Type investissement'}
                textRight={typeSelected?.text}
                onPress={() =>{
                  setTypeModalVisible(true)
                }}
                primary
              />
            <View style = {{ marginTop : 10}}>
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
                        minHeight={130}
                        onChangeText={onChange}
                        textAlignVertical="top"
                        multiline={true}
                        autoCorrect={false}
                        placeholder={'motive du projet..'}
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
            onPress={handleSubmit(submitProjectForm)}
            //outline
            loading={loading}
            round
          >
          {'Soumettre'}
          </Button>
        </View>
        <SelectOptionModal
          isVisible={typeModalVisible}
          options={ProjectTypes}
          onChange = {onTypeSelect}
          onSwipeComplete={() => setTypeModalVisible(false)}
        />
        <SearchModal
            isVisible={actIDModalVisible}
            options={actIDs}
            onChange = {onactIDSelect}
            onSwipeComplete={() => setactIDModalVisible(false)}
        />
      </View>
    )
}
export default ProjectFormScreen