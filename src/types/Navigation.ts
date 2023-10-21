import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {RouteProp} from '@react-navigation/native';

export type  RootStackNavigatorParamList = {
    Home : undefined,
    Auth : undefined,
    profile : undefined,
    //DaFilter : undefined,
    DaForm : undefined,
    BcForm : undefined,
    ActForm : undefined,
    ProjectForm: undefined,
    TransferForm: undefined,
    AccountForm: undefined,
    ProviderForm: undefined,
    DaDetails : undefined,
    BcDetails : undefined,
    AccountDetails : undefined,
    ProjectDetails : undefined,
    DaEdit : undefined,
    BcEdit : undefined,
    DaHistory: undefined
}
export type BottomStackNavigatorParamList = {
    HomeStack : undefined,
    DaStack : undefined,
    BcStack : undefined,
    AccountStack : undefined,
    ProfileStack : undefined,
    DaFormStack : undefined,
    AddButton : undefined ,
}
// Auth Stack Navigator
export type AuthStackNavigatorParamList = {
    Welcome : undefined ,
    SignIn : undefined,
    SignUp : undefined,
    ResetPWD : { phoneNumber ? : string },
    NewPWD : undefined
}

export type HomeStackNavigatorParamList = {
    Report : undefined,
    Profile : undefined,
    Notifications : undefined
   // Report1 : undefined
}
export type DaStackNavigatorParamList = {
    Da: undefined,
    DaDetails: undefined,
    DaFilter : undefined,
  
    //'EditProfile' : undefined
}
export type DaFormStackNavigatorParamList = {
  DaForm: undefined,
  //'EditProfile' : undefined
}

export type BcStackNavigatorParamList = {
    Bc: undefined,
    //'EditProfile' : undefined
}
export type  RootNavigationProp = NativeStackNavigationProp <
RootStackNavigatorParamList,
'Home'
>
export type  HomeNavigationProp = NativeStackNavigationProp <
BottomStackNavigatorParamList,
'HomeStack'
>
export type WelcomeNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'Welcome'
  >
export type SignInNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'SignIn'
  >
  
export type SignUpNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'SignUp'
  >
  
  export type ForgotPasswordNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'ResetPWD'
  >
  export type ForgotPasswordRouteProp = RouteProp <
  AuthStackNavigatorParamList ,
  'ResetPWD'
  >
  export type NewPasswordNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'NewPWD'
  >
  