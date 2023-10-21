import { I18nManager, Platform, StyleSheet } from 'react-native'
import colors from '../../../theme/colors'
import font from '../../../theme/font'

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.white,
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
    forgotPasswordContainer: {
      width: '80%',
      alignSelf: 'center',
      alignItems: 'flex-end',
      marginTop: 8,
    },
    forgotPasswordText: {
      fontSize: font.size.sm,
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
      marginLeft: 10,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  })

export default Styles
