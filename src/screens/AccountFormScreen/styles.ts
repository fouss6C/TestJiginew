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
    viewImage: {
        width: '30%',
        height: 80,
        padding: 2,
        alignSelf: 'center',
        marginTop : 10
      },
    contentImage: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        alignItems:'center'
    },
})