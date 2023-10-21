import { Dimensions, I18nManager, Platform, StyleSheet } from 'react-native'
import colors from '../../../theme/colors'
import font from '../../../theme/font'

const { height } = Dimensions.get('window')
const imageSize = height * 0.09
const imageRadius = height * 0.23 / 2
const photoIconSize = imageSize * 0.3
const photoIconRadius = imageSize * 0.3 / 2

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      shadowColor: '#006',
      alignItems : 'center',
      justifyContent : 'center',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
      marginBottom : 10,
      marginTop : 20 , 
    },
    imageLogo : {
      width : '100%', 
      aspectRatio : 1 , 
      flex:1,
      borderRadius : imageRadius,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.primary,
      marginTop: 20,
      marginBottom: 20,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 20,
    },
    signInContainer: {
      alignSelf: 'center',
      width: '80%',
      borderRadius: 25,
      padding: 10,
      marginTop: 10,
    },
    forgotPasswordContainer: {
      width: '80%',
      alignSelf: 'center',
      alignItems: 'flex-end',
      marginTop: 8,
    },
    forgotPasswordText: {
      fontSize: font.size.s,
      textDecorationLine : 'underline',
      color : colors.blue,
      padding: 4,
    },
    arrow : {
      //marginTop : 20 , 
      alignSelf : 'flex-start',
    },

    backArrowStyle: {
      resizeMode: 'contain',
      tintColor: colors.primary,
      width: 25,
      height: 25,
      marginTop: Platform.OS === 'ios' ? 20 : 20,
      //marginLeft: 10,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  })

export default Styles
