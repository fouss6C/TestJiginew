import { StyleSheet } from "react-native"
import font from  '../../theme/font'
import colors from '../../theme/colors'

const styles = StyleSheet.create({

    container : {
      backgroundColor: colors.white , 
    },
    button: {
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 56,
        height: 56,
        borderRadius: 28,
        shadowColor: 'gray',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      headerTitle : {
        fontWeight : font.weight.bold,
        color : colors.black,
        fontSize : font.size.xlg,
        fontFamily : 'Raleway',
        paddingHorizontal : 20,
        //alignSelf : 'flex-start'
      },
      backTitle : {
        color : colors.primary,
        fontSize : font.size.md,
        fontFamily : 'Raleway',
      }
})
export default styles


