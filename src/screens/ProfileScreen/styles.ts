import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'

export default StyleSheet.create({

    container : {
        flex : 1, 
        padding : 10, 
        width : '100%',
        backgroundColor: colors.white
    },
    contentTitle: {
        alignItems: 'flex-start',
        width: '100%',
        height: 32,
        justifyContent: 'center',
    },
    contain: {
        alignItems: 'center',
        width: '100%',
    },
    textInput: {
        height: 56,
        backgroundColor: colors.card,
        borderRadius: 5,
        padding: 10,
        width: '100%',
    },
    profileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 20,
        paddingTop: 20,
    },
    follow: {
        minWidth: 80,
        height: 28,
        paddingHorizontal: 16,
        marginRight: 24,
        //backgroundColor : colors.card
    },
    viewFollow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 8,
    },
})