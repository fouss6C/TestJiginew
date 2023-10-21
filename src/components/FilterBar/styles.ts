import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 8,
    // height: Utils.scaleWithPixel(60)
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  text: {
    // textAlign: "right",
    textTransform: 'uppercase',
  },
})