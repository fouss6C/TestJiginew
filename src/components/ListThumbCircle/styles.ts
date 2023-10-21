import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'

export default StyleSheet.create({
    contain: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        flex: 1,
    },
    thumb: { 
        width: 40, 
        height: 40, 
        marginRight: 10, 
        borderRadius: 24,
        backgroundColor : colors.primary, 
        alignItems : 'center',
        justifyContent : 'center',
        },
    content: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    right: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
