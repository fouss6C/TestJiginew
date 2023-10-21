import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'

export default StyleSheet.create({

    container : {
        flex : 1, 
        paddingHorizontal : 10, 
        width : '100%',
        backgroundColor: colors.white,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
    },
    /* contentFilterBottom: {
    paddingVertical: 16,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    minHeight:'90%'
    }, */
    contentSwipeDown: {
    marginVertical: 10,
    alignItems: 'center',
    },
    lineSwipeDown: {
    width: 30,
    height:3,
    backgroundColor: colors.primary,
    marginBottom : 10
    },
    contentActionModalBottom: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    },
    image: {
    marginRight: 8,
    },
})