/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {
  StyleSheet,
} from 'react-native'
import Navigation from './src/screens/Navigation'
import AuthContextProvider from './src/screens/Context/AuthContextProvider'

const Jiginew = () => {
  
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  )
}
const styles = StyleSheet.create({
  app : {
    flex : 1,
    marginTop : 50,
  },
})

export default Jiginew
