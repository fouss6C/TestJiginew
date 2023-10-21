import { View, Text, Alert , TouchableOpacity , Image } from 'react-native'
import React , {  useState  } from 'react'
import AuthBtn from '../../../components/auth/button/AuthBtn'
import colors from '../../../theme/colors'
import styles from './styles'
import FormInput from '../../../components/auth/input'
import {useForm} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { WelcomeNavigationProp } from '../../../types/Navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const backArrow = '../../../assets/image/back-arrow.png'

type ResetPasswordData = {
    email : string
}

const ResetPasswordScreen = () => {
    const {control, handleSubmit , watch , reset } = useForm<ResetPasswordData>()
    const [ Loading , setLoading ] = useState(false)
    const Navigator = useNavigation<WelcomeNavigationProp>()
    const insets = useSafeAreaInsets()

    const resetPasswordSubmit = ()=>{
        Alert.alert(" this is a btn test ..")
        reset()
    }
  return (
    <View style = {[styles.container , 
      {paddingTop: insets.top, 
      paddingBottom: insets.bottom, 
      paddingLeft: insets.left,
      paddingRight: insets.right} ]}>
      <TouchableOpacity  style = {styles.arrow} onPress={()=> {Navigator.navigate("Welcome")}}>
        <Image style={styles.backArrowStyle} source={ require (backArrow) } />
      </TouchableOpacity>
      <Text style = { [styles.title ] }> Reinitialiser MDP </Text>
      <View style = {{ width : '100%' }}>
      <FormInput
          name="email"
          control={control}
          placeholder="@orangemali.com"
          rules={{
            required: '@Email est requis ',
            pattern: {value: EMAIL_REGEX, message: 'Email est invalide'},
          }}
        />
      </View>
      <View style = { { marginTop : 25 , width : '100%'}}>
        <AuthBtn  label = " Envoyer OTP " onPress={handleSubmit(resetPasswordSubmit)} color = { colors.primary} />
      </View>
    </View>
  )
}

export default ResetPasswordScreen