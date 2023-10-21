import { View, Text, Image, Alert , ScrollView , TouchableOpacity } from 'react-native'
import React , { useState} from 'react'
import AuthBtn from '../../../components/auth/button/AuthBtn'
import colors from '../../../theme/colors'
import font from '../../../theme/font'
import styles from './styles'
import PhotoIcon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useForm } from 'react-hook-form'
import FormInput from '../../../components/auth/input'
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native'
import { WelcomeNavigationProp } from '../../../types/Navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PickerSelect from '../../../components/PickerSelect'
const avatar = '../../../assets/image/default-avatar.jpg'
const backArrow = '../../../assets/image/back-arrow.png'
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const USERNAME_REGEX = /^[a-zA-Z0-9_]*$/ // alphanumeric and underscore
import TextCustom from '../../../components/Text'
import Button from '../../../components/Button'
import ListOptionSelected from '../../../components/ListOptionSelected'
import SearchOptionModal from '../../../components/SearchModal'
import GroupList from '../../../assets/data/GroupList'
const logo = "../../../assets/image/logo-hand.png"

type signUpData = {
    phoneNumber: string
    email: string
    firstName : string 
    lastName : string 
    password : string
    passwordRepeat : string
    
}

const SignUpScreen = () => {
    const {control, handleSubmit , watch , reset } = useForm<signUpData>()
    const [selected, setSelected] = useState<string>()
    const pwd = watch('password')
    const navigation = useNavigation<WelcomeNavigationProp>()
    const insets = useSafeAreaInsets()
    const [ groupSelected , setGroupSelected] = useState(GroupList[0])
    const [ groupModalVisible , setGroupModalVisible] = useState(false)
    //const [serviceGroup , setServiceGroup] = useState(ServiceGroup[0])

    const onGroupSelect = (item)=> {
      setGroupSelected(item)
      setGroupModalVisible(false)
    }

    const SignUpSubmit = ({phoneNumber , email , firstName, lastName , password, passwordRepeat}: signUpData) => {
      console.log( ' params : ' , phoneNumber + groupSelected.tag + password )
    }
    const BackToWelcome = ()=>{
      navigation.navigate("Welcome")
    }

  return (
    <>
    <View style = {[styles.container , 
      {paddingTop: insets.top, 
      paddingBottom: insets.bottom, 
      paddingLeft: insets.left,
      paddingRight: insets.right} ]}>
      <TouchableOpacity  style = {styles.arrow} onPress={BackToWelcome}>
        <Image style={styles.backArrowStyle} source={ require (backArrow) } />
      </TouchableOpacity>
      <Text style = { styles.title}> M'inscrire </Text>
      <View style = { styles.imageContainer}>
        {/* <Image source = {require(avatar)} style = {styles.image}/>
        <PhotoIcon name = "camera-outline"  size = { 20 }  style = {styles.photo} color = { colors.black}  />  */}
        <Image source = {require(logo)} style = {styles.imageLogo}/>
      </View>
       {/* form content data view  */}
       <ScrollView showsVerticalScrollIndicator = { true } >
       <View style = { styles.formContainer}>
       <FormInput
          name="firstName"
          placeholder="Prenom "
          control={control}
          rules={{
            required: 'Le Prenom est requis ',
            minLength: {
              value: 3,
              message: 'Saisir au moins 3 caractères ',
            },
            maxLength: {
              value: 24,
              message: 'Saisir au plus 24 caractères',
            },
            pattern: {
              value: USERNAME_REGEX,
              message: ' Le prenom doit contenir a-z, 0-9, _',
            },
          }}
        />
        <FormInput
          name="lastName"
          placeholder="Nom de Famille "
          control={control}
          rules={{
            required: 'Le Nom est requis ',
            minLength: {
              value: 3,
              message: 'Saisir au moins 3 caractères',
            },
            maxLength: {
              value: 24,
              message: 'Saisir au plus 24 caractères',
            },
            pattern: {
              value: USERNAME_REGEX,
              message: 'Le Nom doit contenir a-z, 0-9, _',
            },
          }}
        />
       <FormInput
          name="phoneNumber"
          control={control}
          placeholder="Numero mobile "
          rules={{
            required: 'Le Numero de phone est requis ',
            minLength: {
              value: 7,
              message: 'Saisir au moins 7 chiffres ',
            },
            maxLength: {
              value: 12,
              message: 'Saisir au plus 12 chiffres ',
            },
          }}
        />
        <FormInput
          name="email"
          control={control}
          placeholder="@orangemali.com"
          rules={{
            required: '@Email est requis ',
            pattern: {value: EMAIL_REGEX, message: 'Email est invalide'},
          }}
        />
        <FormInput
          name="password"
          control={control}
          placeholder="Mot de passe "
          secureTextEntry
          rules={{
            required: 'Le mot de passe est requis ',
            minLength: {
              value: 8,
              message: 'Saisir au moins 8 caractères ',
            },
          }}
        />
        <FormInput
          name="passwordRepeat"
          control={control}
          placeholder="Confirmer le mot de passe"
          secureTextEntry
          rules={{
            validate: (value: string) =>
              value === pwd || 'le mot de passe non conforme ',
          }}
        />
        <View 
          style = {{ 
            width : '80%' , 
            borderColor : colors.border , 
            //borderWidth : 0.5 , 
            borderRadius : 25, 
            marginVertical : 10 , 
            paddingHorizontal : 10 , 
        }}>
        <ListOptionSelected
          style={{ 
            //marginTop: 15 
          }}
          textLeft={'Service ' +groupSelected?.text}
          textRight={''}
          onPress={() =>
            setGroupModalVisible(true)
          }
          //primary
        />
        </View>
        
        <Button 
          style = {styles.signupContainer}
          round 
          onPress={handleSubmit(SignUpSubmit)} 
        >
          Envoyer 
        </Button>
         {/*  <AuthBtn label = "Envoyer" onPress={handleSubmit(SignUpSubmit)} color= { colors.primary} /> */}
       </View>
       </ScrollView>
      <View style = { styles.tos }>
        <TextCustom footnote >
          Par Envoyer , vous <Text style = {{}}>acceptez</Text> par la même occasion 
        </TextCustom>
        <TextCustom footnote style = {{color : colors.primary }}> les conditions generales d'utilisation du service</TextCustom>
      </View>
    </View>
    <SearchOptionModal
        isVisible={groupModalVisible}
        options={GroupList}
        onChange = {onGroupSelect}
        onSwipeComplete={() => setGroupModalVisible(false)}
    />
    </>
  )
}

export default SignUpScreen