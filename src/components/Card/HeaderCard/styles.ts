import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors'

export default StyleSheet.create({

  headerCard: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
    //marginVertical: 5,
    //backgroundColor: colors.gray,
    justifyContent: 'center',
   // padding: 2,
    flex : 1,
  },
  headerCardPrimary: {
    justifyContent: 'center',
    //alignItems: 'center',
    borderColor : colors.card ,
    borderWidth : 1,
    width : '100%'
  },
  headerCardCenter: {
    backgroundColor: colors.card ,//'transparent',
    alignItems: 'center',
    height: 'auto',
    marginVertical: 0,
  },
  paddingContent: {
    paddingHorizontal: 20,
  },
})
