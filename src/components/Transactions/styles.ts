import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 65,
    borderBottomWidth : 0.5 , 
    borderBottomColor: colors.border,
    padding: 5,
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