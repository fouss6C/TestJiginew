import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BcScreen from '../BcScreen'
import { Typography } from '../../theme/typography'
import BcDetailsScreen from '../BcDetailsScreen/BcDetailsScreen'

const Stack = createNativeStackNavigator()
const BcStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{ 
          headerShown : true 
        }}
    >
        <Stack.Screen
            name = "BC"
            component={ BcScreen}
            options={{
              headerShown : true , 
              headerTitleAlign :'center',
              title : 'Bons de Commandes',
              headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
            }}
        />
        
    </Stack.Navigator>
  )
}

export default BcStackNavigator