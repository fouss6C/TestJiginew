import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import BalanceScreen from '../BalanceScreen'
import AccountScreen from '../AccountScreen'
import { Typography } from '../../theme/typography'

const Stack = createNativeStackNavigator()
const BalanceStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{ 
          headerShown : true 
        }}
    >
        <Stack.Screen
            name = "account"
            component={AccountScreen}
            options={{
              headerTitleAlign :'center',
              title : 'Lignes de Budget ',
              headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
            }}
        />
        <Stack.Screen
            name = "Balance2"
            component={BalanceScreen}
        />
    </Stack.Navigator>
  )
}

export default BalanceStackNavigator