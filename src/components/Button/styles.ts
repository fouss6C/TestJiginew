import { StyleSheet } from 'react-native';
import {font , colors, Typography} from '../../theme'

export default StyleSheet.create({
  default: {
    width : '80%',
    height: 45,
    //borderRadius: 28,
    flexDirection: 'row',
    alignSelf : 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textDefault: {
    ...Typography.body1,
    color: colors.white,
    fontWeight: font.weight.bold,
  },
  outline: {
    borderWidth: 1,
  },

  full: {
    width: '100%',
    alignSelf: 'auto',
  },
  round: {
    borderRadius: 28,
  },
})