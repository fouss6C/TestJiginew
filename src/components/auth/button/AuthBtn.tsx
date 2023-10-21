import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from './style'
import colors from '../../../theme/colors'

interface IAuthBtn {
    label ? : string,
    onPress ? : ()=> void ,
    color ? : string

}
const AuthBtn = ({ label = "" , onPress = ()=> {} , color = '' } : IAuthBtn) => {
  return (
    <Pressable onPress = { onPress } style = { [styles.signupContainer , {backgroundColor: color}]} >
      <Text style = { [styles.signupText, {color : color ? colors.white: colors.black }]}>{label}</Text>
    </Pressable>
  )
}
export default AuthBtn