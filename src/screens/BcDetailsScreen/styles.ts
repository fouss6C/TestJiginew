import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'

export default StyleSheet.create({
  container: {
        flex : 1, 
        paddingHorizontal : 10, 
        width : '100%',
        backgroundColor: colors.white
  },
  listContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor : colors.border,
    paddingTop: 15,
  },
  content: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    marginTop: 5,
  },
  listResult:{
    marginTop: 1,
  },
  styleLeft:{
    color : colors.black , 
    fontWeight : '300' , 
    fontFamily: 'Poppins-Light'
  },
  styleRight:{
    color : colors.black , 
    fontWeight : '300' , 
    fontFamily: 'Poppins-Light'
  },
  specifications: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  wrapContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderColor: colors.divider,
    marginBottom: 20,
  },
})