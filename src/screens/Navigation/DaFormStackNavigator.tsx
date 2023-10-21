import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import styles from './styles'
import { DaFormStackNavigatorParamList} from '../../types/Navigation'
import { useNavigation } from '@react-navigation/native'
import DaFormScreen from '../DaFormScreen/DaFormScreen'
import { Typography } from '../../theme'
import colors from '../../theme/colors'


const Stack = createNativeStackNavigator<DaFormStackNavigatorParamList>()
const DaFormStackNavigator = () => {
  const Navigation = useNavigation()
  return (
    <Stack.Navigator
        screenOptions={{ 
          headerShown : true, 
        }}
    >
        <Stack.Screen
            name = "DaForm"
            component={ DaFormScreen}
            options={{
                headerTitleAlign :'center',
                title : 'Nouvelle Demande',
                headerTitleStyle:[{fontFamily:'Raleway'},Typography.title2]
            }}
        />
    </Stack.Navigator>
  )
}

export default DaFormStackNavigator