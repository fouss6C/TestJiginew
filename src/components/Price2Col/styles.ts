import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 60,
    borderBottomColor : colors.border,
    borderBottomWidth : 0.2,
    padding: 2,
  },
  tagStyle : {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : colors.card,
    borderColor : colors.gray,
    borderWidth : 1,
  },
  text: {
    textAlign: 'right',
  },

  container1: {
    flexDirection: 'row',
    //width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal : 10 ,
  },
  text1: {
    textAlign: 'right',
  },
  title: {
    textTransform: 'uppercase',
  },
  viewRight: {
    alignItems: 'flex-end',
  },
})
