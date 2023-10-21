import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentFilterBottom: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxHeight: '40%',
  },
  contentSwipeDown: {
    paddingBottom: 3,
    alignItems: 'center',
  },
  lineSwipeDown: {
    borderRadius: 10,
    width: 55,
    height: 2.5,
    backgroundColor: colors.white,
  },
  image: {
    width: 16,
    height: 16,
    borderRadius: 16,
    marginRight: 8,
  },
})