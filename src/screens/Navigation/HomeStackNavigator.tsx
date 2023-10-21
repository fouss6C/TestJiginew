import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../HomeScreen'
import { HomeStackNavigatorParamList } from '../../types/Navigation'
import Notification from '../Notification/'
import { Typography } from '../../theme'

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>()
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{ 
           // headerShown : false 
        }}
    >
        <Stack.Screen
            name = "Report"
            component={HomeScreen}
            options = {{
                headerShown : false,
            }}
        />
        <Stack.Screen
            name = "Notifications"
            component={ Notification }
            options={{
                headerTitleAlign :'center',
                headerShown : true , 
                headerBackTitleVisible : false,
                title : 'Notification',
                headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
              }}
        />
        <Stack.Screen
            name = "Profile"
            component={ HomeScreen}
        />

    </Stack.Navigator>
   
  )
}

export default HomeStackNavigator