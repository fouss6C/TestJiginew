/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {
  View ,
  StyleSheet,
  Image,
  ScrollView,
  Platform
} from 'react-native';
import WelcomeScreen from './src/screens/Auth/WelcomeScreen/index'
import LoginScreen from './src/screens/Auth/SignInScreen'
import SignUpScreen from './src/screens/Auth/SignUpScreen'
import ResetPasswordScreen from './src/screens/Auth/ResetPasswordScreen/ResetPasswordScreen';
import Navigation from './src/screens/Navigation'
import Text  from './src/components/Text'
import Button from './src/components/Button'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import colors from './src/theme/colors'
import Icon from './src/components/Icon'
import Card03 from './src/components/Card/Card03'
import HeaderHome from './src/components/Card/HeaderHome'
import HeaderCard from './src/components/Card/HeaderCard'
import Transaction from './src/components/Transactions/Transaction'
import TitleList from './src/components/TitleList';
import PickerSelect from './src/components/PickerSelect';
import { useEffect, useState } from 'react';
import AuthContextProvider from './src/screens/Context/AuthContextProvider';
import SplashScreen from 'react-native-splash-screen';

const Jiginew = () => {
  
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  )
}
const styles = StyleSheet.create({
  app : {
    flex : 1,
    marginTop : 50,
  },
})

export default Jiginew
