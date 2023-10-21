import { View,  TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { RootStackNavigatorParamList } from '../../types/Navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DaFilterScreen from '../DaFilterScreen'
import DaDetailsScreen from '../DaDetailsScreen'
import DaFormScreen from '../DaFormScreen/DaFormScreen'
import Text from '../../components/Text'
import DaEditScreen from '../DaEditDetailsScreen'
import { Typography } from '../../theme/typography'
import BcDetailsScreen from '../BcDetailsScreen/BcDetailsScreen'
import DaFormStackNavigator from './DaFormStackNavigator'
import BcFormScreen from '../BcFormScreen'
import ProfileScreen from '../ProfileScreen'
import TransferFormScreen from '../TransferFormScreen/TransferFormScreen'
import AccountDetailsScreen from '../AccountDetailsScreen'
import HistoricalScreen from '../HistoricalScreen'
import ProjectFormScreen from '../ProjectFormScreen'
import AccountFormScreen from '../AccountFormScreen'
import { AuthContext } from "../Context/AuthContextProvider"
import BcEditScreen from '../BcFormScreen/BcEditScreen'
import ProviderFormScreen from '../ProviderFormScreen'

const Stack = createNativeStackNavigator <RootStackNavigatorParamList> ()
const NavigationRoot = () => {
    const { userToken } = useContext(AuthContext)
  return (
    <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator
                //initialRouteName='Auth'
                screenOptions={{ 
                    headerShown : false, 
                }}
            >
            { ! userToken ?
                
                (<Stack.Screen
                    name = "Auth"
                    component={ AuthStackNavigator}
                />)
                : (<>
                <Stack.Screen
                    name = "Home"
                    component={BottomTabNavigator}
                />
                <Stack.Screen
                    name = "profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: true , 
                        headerTitleAlign :'center',
                        title : 'Profile',
                        headerBackTitleVisible : false,
                    }}
                />
                <Stack.Screen
                    name = "DaForm"
                    component={ DaFormScreen }
                    options={{
                        headerShown: true ,
                        headerTitleAlign :'center',
                        title : 'Nouvelle Demande',
                        headerBackTitleVisible : false,
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                <Stack.Screen
                    name = "BcForm"
                    component={ BcFormScreen }
                    options={{
                        headerShown: true ,
                        headerTitleAlign :'center',
                        title : 'Nouvelle Commande',
                        headerBackTitleVisible : false,
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                <Stack.Screen
                    name = "TransferForm"
                    component={ TransferFormScreen }
                    options={{
                        headerShown: true ,
                        headerTitleAlign :'center',
                        title : 'Nouveau Transfert',
                        headerBackTitleVisible : false,
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                <Stack.Screen
                    name = "ProjectForm"
                    component={ ProjectFormScreen }
                    options={{
                        headerShown: true ,
                        headerTitleAlign :'center',
                        title : 'Nouveau Projet',
                        headerBackTitleVisible : false,
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                <Stack.Screen
                    name = "AccountForm"
                    component={ AccountFormScreen }
                    options={{
                        headerShown: true ,
                        headerTitleAlign :'center',
                        title : 'Nouveau Compte',
                        headerBackTitleVisible : false,
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                <Stack.Screen
                    name = "ProviderForm"
                    component={ ProviderFormScreen }
                    options={{
                        headerShown: true ,
                        headerTitleAlign :'center',
                        title : 'Nouveau Fournisseur ',
                        headerBackTitleVisible : false,
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                <Stack.Screen
                    name = "DaDetails"
                    component={ DaDetailsScreen } 
                    options={{
                        headerShown: true ,
                        headerBackTitleVisible:false,
                        headerTitleAlign :'center',
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                        }}
                />
                <Stack.Screen
                    name = "BcDetails"
                    component={BcDetailsScreen}
                    options={{
                        headerShown : true , 
                        headerBackTitleVisible:false,
                        headerTitleAlign :'center',
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                <Stack.Screen
                    name = "AccountDetails"
                    component={AccountDetailsScreen}
                    options={{
                        headerShown : true , 
                        headerBackTitleVisible:false,
                        headerTitleAlign :'center',
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                <Stack.Screen
                    name = "DaHistory"
                    component={HistoricalScreen}
                    options={{
                        headerShown : true , 
                        headerBackTitleVisible:false,
                        headerTitleAlign :'center',
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                <Stack.Screen
                    name = "BcEdit"
                    component={BcEditScreen}
                    options={{
                        headerShown : true , 
                        headerBackTitleVisible:false,
                        headerTitleAlign :'center',
                        headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
                    }}
                />
                </>
            )
            }
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default NavigationRoot