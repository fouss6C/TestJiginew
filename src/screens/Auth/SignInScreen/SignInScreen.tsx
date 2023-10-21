import { View, Text, Alert , TouchableOpacity , Image } from 'react-native'
import React , {  useContext, useState  } from 'react'
import colors from '../../../theme/colors'
import styles from './styles'
import FormInput from '../../../components/auth/input'
import {useForm} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { WelcomeNavigationProp } from '../../../types/Navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import { AuthContext } from '../../Context/AuthContextProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const backArrow = '../../../assets/image/back-arrow.png'
const logo = "../../../assets/image/logo-hand.png"
import {BaseURL} from '../../../assets/config/config'
let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept : "application/json",
      //"Access-Control-Allow-Origin": "*",
  }
}


type SignInData = {
    username : string
    password : string
}

const SignInScreen = () => {
    const {control, handleSubmit , watch , reset } = useForm<SignInData>()
    const [ Loading , setLoading ] = useState(false)
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const {setUserToken} = useContext (AuthContext)


    const navigateToResetPWD = () => {
      navigation.navigate('ResetPWD')
    }

    const SignInSubmit = async ({ username , password }: SignInData)=>{
     
      console.log( 'username and pasword :' , username + '---'+ password)
      if (Loading) { return }
        setLoading(true)

        let data = {
          "username" : username ,
          "password" : password
        }
        await axios.post(`${BaseURL}/login` , data ,{headers: {'Content-Type': 'multipart/form-data'}}
        ).then(res => {
            const Auth = res.data
            setUserToken(Auth.access_token)
            AsyncStorage.setItem('userToken' ,Auth.access_token)
          }).catch((error)=> {
            if( error.code == 'ERR_BAD_REQUEST') {
              Alert.alert( 'Login ou mot de passe incorrect .. ')
            } else {
              Alert.alert (error.message)
            }
            console.log(error.code)
          }).then( function () {
            setLoading (false)
            reset ()
          })
    }
    const BackToWelcome = ()=>{
      navigation.navigate("Welcome")
    }
  return (
    <View style = {[styles.container , 
      {paddingTop: insets.top, 
      paddingBottom: insets.bottom, 
      paddingLeft: insets.left,
      paddingRight: insets.right} ]}>
      <TouchableOpacity  style = {styles.arrow} onPress={BackToWelcome}>
        <Image style={styles.backArrowStyle} source={ require (backArrow) } />
      </TouchableOpacity>
      <Text style = { [styles.title ] }> Me connecter </Text>
      <View style = { styles.imageContainer}>
        {/* <Image source = {require(avatar)} style = {styles.image}/>
        <PhotoIcon name = "camera-outline"  size = { 20 }  style = {styles.photo} color = { colors.black}  />  */}
        <Image source = {require(logo)} style = {styles.imageLogo}/>
      </View>
      <View style = {{ width : '100%' }}>
        <FormInput
          name="username"
          placeholder="@orangemali.com"
          control={control}
          rules={{
            required: '@Email est requis ',
            pattern: {value: EMAIL_REGEX, message: '@Email est invalide'},
          }}
        />
        <FormInput
          name="password"
          placeholder="Votre mot de passe"
          secureTextEntry
          control={control}
          rules={{
            required: 'Le mot de passe est requis',
            minLength: {
              value: 3,
              message: 'le mot de passe doit avoir au moins 3 caractères',
            },
          }}
        />
      </View>
      <View style = { styles.forgotPasswordContainer }>
        <Text 
          style = {styles.forgotPasswordText}
          onPress={navigateToResetPWD}
        > 
        Mot de passe oublié ?
        </Text>
      </View>
      <View style = { { marginTop : 25 , width : '100%'}}>
        <Button 
            style = {styles.signInContainer}
            round 
            onPress={handleSubmit(SignInSubmit)} 
        >
            Envoyer 
        </Button>
      </View>
    </View>
  )
}
export default SignInScreen