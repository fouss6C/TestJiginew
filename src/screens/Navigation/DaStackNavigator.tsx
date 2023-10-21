import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DaScreen from '../DaScreen'
import styles from './styles'
import { DaStackNavigatorParamList } from '../../types/Navigation'
import DaDetailsScreen from '../DaDetailsScreen'
import DaFilterScreen from '../DaFilterScreen'
import { useNavigation } from '@react-navigation/native'
import Text from '../../components/Text'
import Navigation from '.'
import DaFormScreen from '../DaFormScreen/DaFormScreen'
import { Typography } from '../../theme/typography'


const Stack = createNativeStackNavigator<DaStackNavigatorParamList>()
const DaStackNavigator = () => {
  const Navigation = useNavigation()
  return (
    <Stack.Navigator
        screenOptions={{ 
          headerShown : true, 
        }}
    >
        <Stack.Screen
            name = "Da"
            component={ DaScreen}
            options={{
              headerTitleAlign :'center',
              title : 'Demandes Achats',
              headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
            }}
        />
    </Stack.Navigator>
  )
}

export default DaStackNavigator