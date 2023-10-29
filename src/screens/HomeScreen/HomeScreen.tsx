import { View, Text , Pressable, ScrollView, FlatList, RefreshControl, TouchableOpacity, Alert} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import HeaderHome from '../../components/Card/HeaderHome'
import HeaderCard from '../../components/Card/HeaderCard'
import colors from '../../theme/colors'
import styles from './styles'
import Card03 from '../../components/Card/Card03'
import Card04 from '../../components/Card/Card04'
//import account from '../../assets/data/BalanceAccounts'
import Price2Col from '../../components/Price2Col'
import FilterBar from '../../components/FilterBar'
import Balance from '../../assets/data/BalanceGlobal'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProp } from '../../types/Navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../Context/AuthContextProvider'
import axios from 'axios'
import { BaseURL } from '../../assets/config/config'
import EmptyList from '../../components/EmptyList'

// get global account variables from axios call 

const HomeScreen = () => {

  const insets = useSafeAreaInsets()
  const {userToken} = useContext(AuthContext)
  const [filter, setFilter] = useState({
    leftValue: false,
    centerValue: false,
    rightValue: true,
  })
  const [refreshing] = useState(false)
  const [accountMain, setAccountMain] = useState([])
  const navigation = useNavigation<RootNavigationProp>()
  //const [balanceSelected , setBalancedSelected] = useState(Balance) 

  // Balance Oracle state Variale 

  // Balance Available state variable 
  const [balanceOracleType , setBalanceOracleType] = useState<string | undefined>('GLOBAL')
  const [balanceOracle , setBalanceOracle] = useState<string | undefined>(Balance[0].currentBal)
  //const [balOraclePercent , setBalOraclePercent] = useState<string | undefined>(Balance[0].percent)
  //const [balAvailableUp , setBalAvailableUp] = useState<undefined | boolean>(Balance[0].isUp)
  const [balOracleTitle , setBalOracleTitle] = useState<string | undefined>('Solde Réel')

  // Balance Available state variable 
  const [balanceAvailableType , setBalanceAvailableType] = useState<string | undefined>('GLOBAL')
  const [balanceAvailable , setBalanceAvailable] = useState<string | undefined>(Balance[1].currentBal)
  const [balAvailablePercent , setBalAvailablePercent] = useState<string | undefined>(Balance[1].percent)
  const [balAvailableUp , setBalAvailableUp] = useState<undefined | boolean>(Balance[1].isUp)
  const [balAvailableTitle , setBalAvailableTitle] = useState<string | undefined>('Global interne')
 
  const [balanceEngagedType , setBalanceEngagedType] = useState<string | undefined>('GLOBAL')
  const [balanceEngaged , setBalanceEngaged] = useState<string | undefined>(Balance[2].currentBal)
  const [balEngagedPercent , setBalEngagedPercent] = useState<string | undefined>(Balance[2].percent)
  const [balEngagedUp , setBalEngagedUp] = useState<undefined | boolean>(Balance[2].isUp)
  const [balEngagedTitle , setBalEngagedTitle] = useState<string | undefined>('Somme engagée')

  const [balanceAllocatedType , setBalanceAllocatedType] = useState<string | undefined>('GLOBAL')
  const [balanceAllocated , setBalanceAllocated] = useState<string | undefined>(Balance[3].currentBal)
  const [balanceInitialHT , setBalanceInitialHT] = useState<string | undefined>(Balance[4].currentBal)
  const [balanceTaxes , setBalanceTaxes] = useState<string | undefined>(Balance[5].currentBal)
  const [balanceRallonge , setBalanceRallonge] = useState<string | undefined>(Balance[6].currentBal)

  const [balAllocatedPercent , setBalAllocatedPercent] = useState<string | undefined>(Balance[3].percent)
  const [balInitialHTPercent, setBalInitialHTPercent] = useState<string | undefined>(Balance[4].percent)
  const [balTaxesPercent , setBalTaxesPercent] = useState<string | undefined>(Balance[5].percent)
  const [balRallongePercent , setBalRallongePercent] = useState<string | undefined>(Balance[6].percent)

  const [balInitialHTTitle , setBalInitialHTTitle] = useState<string | undefined>('Initial HT')
  const [balTaxesTitle , setBalTaxesTitle] = useState<string | undefined>('Droits de Douanes')
  const [balRallongeTitle , setBalRallongeTitle] = useState<string | undefined>('Rallonges')
  
  const toggleBalOracle = () => {

    if (balanceOracleType =='GLOBAL') {
  
        setBalanceOracle(Balance[0].currentBalCapex)
        //setBalOraclePercent(Balance[1].percentCapex)
        //setBalAvailableUp(Balance[1].isUpCapex)
        setBalOracleTitle("Solde Capex  ")
        setBalanceOracleType('CAPEX')
  
      } else if (balanceOracleType == 'CAPEX') {
        setBalanceAvailable(Balance[0].currentBalOpex)
        //setBalOraclePercent(Balance[1].percentOpex)
        //setBalAvailableUp(Balance[1].isUpOpex)
        setBalOracleTitle("Solde Opex ")
        setBalanceOracleType('OPEX')
  
      } else {
  
        setBalanceOracle(Balance[0].currentBal)
        //setBalOraclePercent(Balance[1].percent)
        //setBalOracleUp(Balance[1].isUp)
        setBalOracleTitle("Solde Réel")
        setBalanceOracleType('GLOBAL')
      } 
    }
  
  const toggleBalAvailable = () => {

  if (balanceAvailableType =='GLOBAL') {

      setBalanceAvailable(Balance[1].currentBalCapex)
      setBalAvailablePercent(Balance[1].percentCapex)
      setBalAvailableUp(Balance[1].isUpCapex)
      setBalAvailableTitle("Capex interne ")
      setBalanceAvailableType('CAPEX')

    } else if (balanceAvailableType == 'CAPEX') {
      setBalanceAvailable(Balance[1].currentBalOpex)
      setBalAvailablePercent(Balance[1].percentOpex)
      setBalAvailableUp(Balance[1].isUpOpex)
      setBalAvailableTitle("Opex interne ")
      setBalanceAvailableType('OPEX')

    } else {

      setBalanceAvailable(Balance[1].currentBal)
      setBalAvailablePercent(Balance[1].percent)
      setBalAvailableUp(Balance[1].isUp)
      setBalAvailableTitle("Global interne ")
      setBalanceAvailableType('GLOBAL')
    } 
  }

  const toggleBalEngaged = () => {
    if (balanceEngagedType =='GLOBAL') {

      setBalanceEngaged(Balance[2].currentBalCapex)
      setBalEngagedPercent(Balance[2].percentCapex)
      setBalEngagedUp(Balance[2].isUpCapex)
      setBalEngagedTitle("Capex engagé ")
      setBalanceEngagedType('CAPEX')
  
    } else if (balanceEngagedType == 'CAPEX') {
      setBalanceEngaged(Balance[2].currentBalOpex)
      setBalEngagedPercent(Balance[2].percentOpex)
      setBalEngagedUp(Balance[2].isUpOpex)
      setBalEngagedTitle("Opex engagé ")
      setBalanceEngagedType('OPEX')
  
    } else {
  
      setBalanceEngaged(Balance[2].currentBal)
      setBalEngagedPercent(Balance[2].percent)
      setBalEngagedUp(Balance[2].isUp)
      setBalEngagedTitle("Global engagée ")
      setBalanceEngagedType('GLOBAL')
    }
  }
  const toggleBalAllocated = () => {
    if (balanceAllocatedType =='GLOBAL') {

      setBalanceAllocated(Balance[3].currentBalCapex)
      setBalanceInitialHT(Balance[4].currentBalCapex)
      setBalanceTaxes(Balance[5].currentBalCapex)
      setBalanceRallonge(Balance[6].currentBalCapex)

      setBalInitialHTPercent(Balance[4].percentCapex)
      setBalTaxesPercent(Balance[5].percentCapex)
      setBalRallongePercent(Balance[6].percentCapex)

      setBalInitialHTTitle('Initial Capex')
      setBalTaxesTitle('Taxes Capex')
      setBalRallongeTitle('Rallonge Capex')

      setBalanceAllocatedType('CAPEX')
  
    } else if (balanceAllocatedType == 'CAPEX') {
      
      setBalanceAllocated(Balance[3].currentBalOpex)
      setBalanceInitialHT(Balance[4].currentBalOpex)
      setBalanceTaxes(Balance[5].currentBalOpex)
      setBalanceRallonge(Balance[6].currentBalOpex)

      setBalInitialHTPercent(Balance[4].percentOpex)
      setBalTaxesPercent(Balance[5].percentOpex)
      setBalRallongePercent(Balance[6].percentOpex)

      setBalInitialHTTitle('Initial Opex')
      setBalTaxesTitle('Taxes Opex')
      setBalRallongeTitle('Rallonge Opex')

      setBalanceAllocatedType('OPEX')
  
    } else {
      setBalanceAllocated(Balance[3].currentBal)
      setBalanceInitialHT(Balance[4].currentBal)
      setBalanceTaxes(Balance[5].currentBal)
      setBalanceRallonge(Balance[6].currentBal)

      setBalInitialHTPercent(Balance[4].percent)
      setBalTaxesPercent(Balance[5].percent)
      setBalRallongePercent(Balance[6].percent)

      setBalInitialHTTitle('Initial Global')
      setBalTaxesTitle('Taxes Global')
      setBalRallongeTitle('Rallonge Global')
      setBalanceAllocatedType('GLOBAL')
    }
  }


//const [account ,setAccount] = useState([])
useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/accounts`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        console.log (res.data)
        //setAccount (res.data)
        setAccountMain(res.data)
      }).catch((error)=> {
        if( error.code == 'ERR_BAD_REQUEST') {
          //Alert.alert( 'No response from server , check the URL ..')
          console.log(error.message)
        } else {
         // Alert.alert(error.message)
         console.log(error.message)
        }
        console.log(error.code)
      }).then( function () {
        //
      })
    }
    response()
  }, [])


  const navigateToProfile = () => {
    navigation.navigate ('profile')
  }
  const navigateToNotification = () => {
    navigation.navigate ('Notifications')
  }
  
  const onFilterChange = (value) => {
    if (value.leftValue !== filter.leftValue) {
      setAccountMain(
        accountMain.sort((a, b) => {
          //const aValue = parseFloat(a.initialAmountTTC.replaceAll(' B', ''));
          //const bValue = parseFloat(b.initialAmountTTC.replaceAll(' B', ''));
          const aValue = parseFloat(a.initialAmountTTC)
          const bValue = parseFloat(b.initialAmountTTC)

          if (value.leftValue) {
            return bValue - aValue;
          } else {
            return aValue - bValue;
          }
        })
      )
    }
    if (value.centerValue !== filter.centerValue) {
      setAccountMain(
        accountMain.sort((a, b) => {
          const x = a.isUp;
          const y = b.isUp;
          if (value.centerValue) {
            return x === y ? 0 : x ? -1 : 1;
          } else {
            return x === y ? 0 : x ? 1 : -1;
          }
        })
      )
      
    }
    if (value.rightValue !== filter.rightValue) {
      setAccountMain(
        accountMain.sort((a, b) => {
          //const aValue = parseFloat(a.balance.replaceAll('KX', ''))
          //const bValue = parseFloat(b.balance.replaceAll('KX', ''))
          const aValue = parseFloat(a.balance);
          const bValue = parseFloat(b.balance);
          if (value.rightValue) {
            return bValue - aValue;
          } else {
            return aValue - bValue;
          }
        })
      )
    }
    setFilter(value)
  }
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // Paddings to handle safe area
        paddingTop: insets.top,
        //paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor : colors.white
      }}
    >
      <HeaderHome userName = {userToken?.auth_user?.firstName + ' ' + userToken?.auth_user?.lastName} onPressLeft = {navigateToProfile} onPressRight={navigateToNotification}  />
      <View style = {styles.container} >
          <HeaderCard isPrimary isCenter title = {balOracleTitle} badge = {Balance[0].date} value = {"Md "+balanceOracle} onPress={toggleBalOracle} />
          
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 1, paddingRight: 2 }}>

              <Card03
                style={{ 
                  marginBottom: 5
                }}
                icon="autorenew"
                title="Fonds Disponible"
                price={"Md "+ balanceAvailable}
                subTitle={balAvailableTitle}
                percent={balAvailablePercent}
                isUp = { balAvailableUp }
                onPress={toggleBalAvailable}
              />
              <Card03
                style={{
                  marginTop: 5
                }}
                icon="autorenew"
                title="Fonds Engagé"
                price={"Md "+ balanceEngaged}
                subTitle={balEngagedTitle}
                percent={balEngagedPercent}
                isUp = { balEngagedUp }
                onPress={toggleBalEngaged}
              />
            </View>
            <View style={{ flex: 1, paddingLeft: 2}}>
              <Card04
                contentStyle={{ paddingBottom: 22}}
                icon="autorenew"
                title="Fonds Alloué"
                price={"Md "+ balanceAllocated}
                subTitle1={balInitialHTTitle}
                percent1={balInitialHTPercent}
                value1 = {"Md "+ balanceInitialHT}
                subTitle2={balTaxesTitle}
                percent2={balTaxesPercent}
                value2 = {"Md "+ balanceTaxes}
                subTitle3={balRallongeTitle}
                percent3={balRallongePercent}
                value3 = {"Md "+ balanceRallonge}
                description="Fonds alloué avec les droits de douanes et rallonges budgetaires"
                onPress={toggleBalAllocated}
              />
            </View>
          </View>
        {/*  show account status in below  FlatList */}
        
      </View>
      <View style={[styles.container, { flexDirection: 'column' }]}>
        <FilterBar
            leftTitle={"Comptes"}
            centerTitle={''}
            rightTitle={'Disponible'}
            value={filter}
            onChange={onFilterChange}
            centerSet = {false}
        />
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 5
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={accountMain}
          keyExtractor={(_item, index) => index.toString()}
          ListEmptyComponent={({item}) => (<EmptyList  item = {item}/>)}
          renderItem={({ item: itemInline, index }) => (
            <Price2Col
              key={index}
              tagAct= {itemInline.tag }
              //image={itemInline.image}
              code={itemInline.acctID}
              name={itemInline.name}
              usedBal={itemInline.usedBal}
              initialBal={(itemInline.initialAmountTTC / Math.pow(10,6)).toFixed(2) + 'MX'}
              percent={itemInline.percent?itemInline.percent : '10%'} // consumption rate of Budget
              currentBal={'MX'+(itemInline.balance/ Math.pow(10,6)).toFixed(2)}
              isUp={itemInline.isUp}
              statusAct={itemInline.status.tag}
              onPress={() => {}}
            />
          )}
        />
        </View>
    </View>
  )
}

export default HomeScreen