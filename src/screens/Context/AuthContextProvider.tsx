import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useState , ReactNode , Dispatch, SetStateAction, useContext, useEffect } from "react"

type userType  = string | undefined | null

 type AuthType = {
  userToken : userType,
  setUserToken : Dispatch<React.SetStateAction<userType>>
 }
 export const AuthContext = createContext <AuthType>( {
  userToken : undefined , 
  setUserToken : () => {}
} )

const AuthContextProvider = ( { children } : { children : ReactNode }) => {
  const [ userToken , setUserToken ] = useState <userType>( undefined )
    useEffect(()=> {
        const checkUser = async() => {
            try {
                const userToken = await  AsyncStorage.getItem('userToken')
                setUserToken (userToken)
            } catch  ( e ) {
                setUserToken ( null )
            }
        }
        checkUser()
    }, [])
  
  return (
    <AuthContext.Provider value = { {userToken , setUserToken} }>
      { children }
    </AuthContext.Provider>
  )
}
export default AuthContextProvider