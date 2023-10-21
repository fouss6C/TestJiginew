import { StyleSheet } from 'react-native'
import colors from '../../../theme/colors'

export default StyleSheet.create({
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor : colors.gray , 
    //borderWidth : 1, 

  },
  contentHeader: { 
    paddingLeft: 8, 
    flex: 1 
},
  notyHeader: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 5,
    right: 0,
  },
  avatar: {
    width : 36,
    aspectRatio : 1,
    borderRadius: 18,
    borderColor : colors.gray, 
    borderWidth : 1, 
    resizeMode : 'contain'
  },
  avatarLogo : {
    width : 36,
    aspectRatio : 1,
    borderRadius: 18,
    borderColor : colors.border, 
    borderWidth : 0.3, 
    resizeMode : 'contain'
  },

  paddingContent: {
    paddingHorizontal: 20,
  },
})