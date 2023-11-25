import { Dimensions, StyleSheet } from 'react-native'
import { Platform } from 'react-native'
import colors from '../../../theme/colors'
import font from '../../../theme/font'

const { height } = Dimensions.get('window')
const imageSize = height * 0.09
const imageRadius = height * 0.23 / 2
const photoIconSize = imageSize * 0.3
const photoIconRadius = imageSize * 0.3 / 2

const Styles = StyleSheet.create({
    imageBackground : {
      justifyContent: 'center',
      width : '100%',
      aspectRatio : 4/1,
      //backgroundColor : 'white'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
      backgroundColor: colors.white,
    },
    logo: {
      width: '35%',
      aspectRatio : 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 150,
    },
    logoImage: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
      borderColor : colors.grey , 
      borderWidth : 0.5,
      borderRadius : 100,
     //tintColor: colors.primary,
    },
    title: {
      marginBottom: 30,
      textAlign: 'center',
    },
    caption: {
      fontSize: font.size.md,
      fontWeight : font.weight.normal,
      paddingHorizontal: 30,
      marginBottom: 30,
      textAlign: 'center',
      color: colors.secondary,
    },
    loginContainer: {
      width: '70%',
      backgroundColor: colors.primary,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      alignItems : 'center',
      justifyContent: 'center',
      height: 48,
    },
    loginText: {
      color: colors.onPrimary,
    },
    signupContainer: {
      width: '70%',
      //backgroundColor: colors.white,
      borderRadius: 25,
      borderWidth: Platform.OS === 'ios' ? 0.5 : 1.0,
      borderColor: colors.primary,
      padding: 10,
      marginTop: 20,
      alignSelf: 'center',
      alignItems : 'center',
      justifyContent: 'center',
      height: 45,
    },
    signupText: {
      color: colors.primary
    }
  })
  export default Styles
