import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useState , ReactNode , Dispatch, SetStateAction, useContext, useEffect } from "react"

type authObject = {
  access_token : string 
  auth_user : object
  refresh_token : string
}
type userType  = authObject | undefined | null

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
                const JsonUser = await  AsyncStorage.getItem('userToken')
                setUserToken (JSON.parse (JsonUser))
            } catch  ( e ) {
                setUserToken ( null )
            }
        }
        checkUser()
    }, [])
  
  return (
    <AuthContext.Provider value = { {userToken , setUserToken}  }>
      { children }
    </AuthContext.Provider>
  )
}
export default AuthContextProvider