import { Dimensions, I18nManager, StyleSheet , Platform } from 'react-native'
import colors from '../../../theme/colors'
import font from '../../../theme/font'

const { height } = Dimensions.get('window')
const imageSize = height * 0.09
const imageRadius = height * 0.23 / 2
const photoIconSize = imageSize * 0.3
const photoIconRadius = imageSize * 0.3 / 2

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.primary,
      marginTop: 20,
      marginBottom: 20,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 20,
    },
    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: 'center',
      fontSize: 20,
    },
    signupContainer: {
      alignSelf: 'center',
      width: '80%',
      borderRadius: 25,
      padding: 10,
      marginTop: 10,
    },
    signupText: {
      color: colors.white,
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      shadowColor: '#006',
      alignItems : 'center',
      justifyContent : 'center',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
      marginBottom : 10,
      marginTop : 20 , 
    },
    
    image : {
      width : '100%', 
      aspectRatio : 1 , 
      flex:1,
      borderRadius : imageRadius,
      borderWidth : 1,
      resizeMode: 'contain',
      borderColor : colors.grey,
    },
    imageLogo : {
      width : '100%', 
      aspectRatio : 1 , 
      flex:1,
      borderRadius : imageRadius,
      resizeMode: 'contain',
    },

    photo: {
      position : 'absolute',
      right: 1,
      bottom : 1,
      borderWidth : 1,
      borderRadius : photoIconRadius,
      //resizeMode: 'contain',
      borderColor : colors.grey,
      width: photoIconSize,
      height: photoIconSize,
    },

    formContainer: {
      width: '100%',
      alignItems: 'center',
      flex : 1 
    },

    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      opacity: 0.8,
      zIndex: 2,
    },
    orTextStyle: {
      color: 'black',
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
      //color: colorSet.primaryText,
    },
    PhoneNumberContainer: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    smsText: {
      color: '#4267b2',
    },
    tos: {
      marginTop: 45,
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: 20,
    },
    arrow : {
      //marginTop : 20 , 
      alignSelf : 'flex-start',
    },
    backArrowStyle: {
      resizeMode: 'contain',
      tintColor: colors.primary,
      width: 25,
      height: 25,
      marginTop: Platform.OS === 'ios' ? 20 : 20,
      marginLeft: 10,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    selectGroup : {
      height: 40,
      borderWidth: 1,
      borderColor : colors.grey,
      backgroundColor: colors.white,
      width: '80%',
      alignSelf: 'center',
      justifyContent : 'center',
      marginTop: 15,
      marginBottom: 2 ,
      borderRadius: 25,
    },
    dropdownGroup : {
      borderColor : colors.primary , 
    
    },

    selectInput : {
      height : 30,
      flex : 1,
      width : "90%" ,
      fontSize : font.size.sm,
      alignSelf : 'auto'
    }
  })

export default Styles
