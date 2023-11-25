import { Platform, StyleSheet } from 'react-native'
import colors from '../../theme/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 65,
    //borderBottomWidth : 0.5 , 
    //borderBottomColor: colors.border,
    //borderWidth : 0.3 , 
    borderRadius: 8,
    padding: 3,
    marginBottom : 5, 
    //marginHorizontal : 2 , 
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  image: {
    height: 36,
    width: 36,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'right',
  },
})