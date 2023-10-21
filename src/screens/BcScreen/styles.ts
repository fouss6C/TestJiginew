import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'

export default StyleSheet.create({
    container : {
        flex : 1, 
        paddingHorizontal : 10, 
        width : '100%',
        backgroundColor: colors.white
    },
    paddingSrollView: { padding: 20, marginTop: 10 },
    paddingFlatList: {
    paddingHorizontal: 20,
    },
    topicsView: {
    marginVertical: 24,
    },
    title: { marginBottom: 5 },
})
