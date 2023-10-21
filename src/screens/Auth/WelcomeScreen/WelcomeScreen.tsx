import { View, Text, Image, Pressable, Alert } from 'react-native'
import React from 'react'
import style from './styles'
import Icon6 from 'react-native-vector-icons/FontAwesome6'
import colors from '../../../theme/colors'
import MaterialComIcon  from 'react-native-vector-icons/MaterialCommunityIcons'
import AuthBtn from '../../../components/auth/button/AuthBtn'
import { useNavigation } from '@react-navigation/native'
import { HomeNavigationProp, SignInNavigationProp, SignUpNavigationProp } from '../../../types/Navigation'
import TextCustom from '../../../components/Text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const logo = "../../../assets/image/logo-hand.png"


const WelcomeScreen = () => {
  const Navigator = useNavigation<SignInNavigationProp|SignUpNavigationProp>()
  const insets = useSafeAreaInsets()
  const SignInClicked = ()=> {
    Navigator.navigate("SignIn")
  }
  const SignUpClicked = () => {
    Navigator.navigate("SignUp")
  }
  return (
   
    <View style ={ [style.container , 
      {paddingTop: insets.top, 
      paddingBottom: insets.bottom, 
      paddingLeft: insets.left,
      paddingRight: insets.right} ] }>
        {/* Logo of Jiginew App  */}
        <View style = { style.logo } >
          <Image  source = { require (logo) } style = {style.logoImage} />
         {/* <MaterialComIcon  name = "hand-coin-outline" size = { 80 } color = { colors.primary} />  */}
        </View>
        <TextCustom  header heavy style = {style.title}> Jiginew </TextCustom> 
        <Text style = { style.caption }> Gerez votre portefeuille d'investissement en toute simplicité  avec Jiginew </Text>
        {/* <AuthBtn label = "Se connecter " onPress={SignInClicked} color = { colors.primary } /> */}
        <Button 
          style = {style.signupContainer}
          round 
          onPress={SignInClicked} 
          icon = {<Icon style={{ marginHorizontal: 5 }} name="login-variant" color="white" size={20} />}
        >
          Se connecter
        </Button>
        <Button 
          style = {style.signupContainer}
          outline
          onPress={SignUpClicked} 
          icon = {<Icon style={{ marginHorizontal: 5 }} name="account-arrow-right" color={colors.primary} size={20} />}
        >
          S'inscrire
        </Button>
    </View>
  )
}

export default WelcomeScreen