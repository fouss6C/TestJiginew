import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../Auth/WelcomeScreen'
import SignInScreen from '../Auth/SignInScreen'
import SignUpScreen from '../Auth/SignUpScreen'
import ResetPasswordScreen from '../Auth/ResetPasswordScreen/ResetPasswordScreen'
import { AuthStackNavigatorParamList } from '../../types/Navigation'


const Stack = createNativeStackNavigator<AuthStackNavigatorParamList>()
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName='Welcome'
    screenOptions={{ headerShown : false }}
    >
      <Stack.Screen
      name = "Welcome"
      component={ WelcomeScreen}
      />
      <Stack.Screen
      name = "SignIn"
      component={ SignInScreen}
      />
      <Stack.Screen
      name = "SignUp"
      component={SignUpScreen}
      />
      <Stack.Screen
      name = "ResetPWD"
      component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator