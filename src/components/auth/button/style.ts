import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'
import colors from '../../../theme/colors'
import font from '../../../theme/font'

const Styles = StyleSheet.create({
    signupContainer: {
      width: '70%',
      backgroundColor: colors.white,
      borderRadius: 25,
      borderWidth: Platform.OS === 'ios' ? 0.5 : 1.0,
      borderColor: colors.primary,
      padding: 10,
      marginTop: 20,
      alignSelf: 'center',
      alignItems : 'center',
      justifyContent: 'center',
      height: 40,
    },
    signupText: {
      color: colors.primary,
      fontSize : font.size.sm,
      fontWeight : font.weight.bold
    }
  })
  export default Styles