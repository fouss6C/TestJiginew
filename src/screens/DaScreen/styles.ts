import { StyleSheet } from 'react-native';
import colors from '../../theme/colors'

export default StyleSheet.create({
    container : {
        flex : 1, 
        paddingHorizontal : 10, 
        width : '100%',
        backgroundColor: colors.white
    },
    contain: {
    flex: 1,
    },
    paddingFlatList: {
        paddingHorizontal: 15,
    },
    item: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    },
})
