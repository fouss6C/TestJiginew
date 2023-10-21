import { View, Text , Pressable, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import BcStackNavigator from './BcStackNavigator'
import AccountStackNavigator from './AccountStackNavigator'
import DaStackNavigator from './DaStackNavigator'
import ProfileStackNavigator from './ProfileStackNavigator'
import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../theme/colors'
import font from '../../theme/font'
import styles from './styles'
import { BottomStackNavigatorParamList } from '../../types/Navigation'
import SubmitButtonModal from './SubmitButtonModal'


const Tab = createBottomTabNavigator<BottomStackNavigatorParamList>()
const AddButtonComponent = () => {
  return null 
}
const BottomTabNavigator = () => {
  
  return (

    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
       //tabBarInactiveTintColor : colors.gray,
        tabBarLabelStyle : {fontSize : 14 , flex : 1 , fontWeight:'300' },
        headerShown : false ,
      }}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStackNavigator}
        options = {{
          tabBarLabel : "Budget",
          headerShown :false , 
          tabBarIcon : ({size , color})=> <MaterialDesignIcon name = "view-dashboard" size = {size} color = {color} /> 
          }}
      />
      <Tab.Screen 
        name="DaStack" 
        component={DaStackNavigator}
        options = {{
          tabBarLabel : 'Demandes',
          //headerShown : true, 
          tabBarIcon : ({size , color})=> <MaterialDesignIcon name = "credit-card-sync-outline" size = {size} color = {color} /> 
          }}
       />
      <Tab.Screen 
        name="AddButton" 
        component={AddButtonComponent}
        options = {{
          headerShown : false, 
          tabBarButton : (props) => (<SubmitButtonModal {...props} />),

          }}
      />
      <Tab.Screen  
        name="BcStack" 
        component={BcStackNavigator}
        options = {{
          tabBarLabel : 'Commandes',
          //headerShown : false , 
          tabBarIcon : ({size , color})=> <MaterialDesignIcon name = "credit-card-check-outline" size = {size} color = {color} /> 
          }}
       />
      <Tab.Screen 
        name="AccountStack" 
        component={AccountStackNavigator}
        options = {{
          tabBarLabel : 'Comptes',
          //headerShown : false , 
          tabBarIcon : ({size , color})=> <MaterialDesignIcon name = "list-status" size = {size} color = {color} /> 
          }}
       />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator