import { View, Text , Pressable, ScrollView, FlatList, RefreshControl, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import HeaderHome from '../../components/Card/HeaderHome'
import HeaderCard from '../../components/Card/HeaderCard'
import colors from '../../theme/colors'
import styles from './styles'
import Card02 from '../../components/Card/Card02'
import Card03 from '../../components/Card/Card03'
import Card04 from '../../components/Card/Card04'
import DAccountMain from '../../assets/data/BalanceAccounts'
import Price2Col from '../../components/Price2Col'
import FilterBar from '../../components/FilterBar'
import Balance from '../../assets/data/BalanceGlobal'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProp } from '../../types/Navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import Balance data 


const HomeScreen = () => {


  const insets = useSafeAreaInsets()
  const [filter, setFilter] = useState({
    leftValue: false,
    centerValue: false,
    rightValue: true,
  })
  const [refreshing] = useState(false)
  const [AccountMain, setAccountMain] = useState(DAccountMain)
  const user = 'test user'
  const navigation = useNavigation<RootNavigationProp>()
  const [accountType , setAccountType] = useState('GLOBAL')
  
  // Balance Available value change state
  const [balanceAvailable , setBalanceAvailable] = useState(Balance[1].currentBal)
  const [balAvailablePercent , setBalAvailablePercent] = useState(Balance[1].percent)
  const [balAvailableUp , setBalAvailableUp] = useState(Balance[1].isUp)

  // const route = useRoute()
  //const item = route?.params?.item ?? { name: 'Bitcoin' };
  /* useEffect(() => {
    if (route?.params?.item?.id) {
      setAccountMain(AccountMain.filter((itemOld) => itemOld.id !== item.id));
    }
  }, [route?.params?.item]); */

  const toggleAccount = (option) => {
    setAccountType(option)
  }

  const goProfileScreen = () => {
    navigation.navigate ('profile', { profile : user })
  }
  const onFilterChange = (value) => {
    if (value.leftValue !== filter.leftValue) {
      setAccountMain(
        DAccountMain.sort((a, b) => {
          const aValue = parseFloat(a.initialBal.replaceAll(' B', ''));
          const bValue = parseFloat(b.initialBal.replaceAll(' B', ''));
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
        DAccountMain.sort((a, b) => {
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
        DAccountMain.sort((a, b) => {
          const aValue = parseFloat(a.currentBal.replaceAll('KX', ''));
          const bValue = parseFloat(b.currentBal.replaceAll('KX', ''));
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
      <HeaderHome userName = {user} onPressLeft = {goProfileScreen} onPressRight={() => {}}  />
      <View style = {styles.container} >
          <HeaderCard isPrimary isCenter title = "Solde Oracle " badge = {Balance[0].date} value = {"Md "+Balance[0].currentBal} onPress={() => {}} disabled/>
          
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 1, paddingRight: 2 }}>

              <Card03
                style={{ 
                  marginBottom: 5
                }}
                icon="autorenew"
                title="Fonds Disponible"
                price={"Md "+ Balance[1].currentBal}
                subTitle="Compte interne"
                percent={Balance[1].percent}
                isUp = { Balance[1].isUp }
                onPress={() => toggleAccount}
              />
              <Card03
                style={{
                  marginTop: 5
                }}
                icon="autorenew"
                title="Fonds Engagé"
                price={"Md "+ Balance[2].currentBal}
                subTitle="Demande Achats"
                percent={Balance[2].percent}
                isUp = {Balance[2].isUp}
                onPress={() => toggleAccount}
              />
            </View>
            <View style={{ flex: 1, paddingLeft: 2}}>
              <Card04
                contentStyle={{ paddingBottom: 22}}
                icon="autorenew"
                title="Fonds Alloué"
                price={"Md "+ Balance[3].currentBal}
                subTitle1="Initial HT "
                percent1={Balance[4].percent}
                value1 = {"Md "+ Balance[4].currentBal}
                subTitle2="Droits Douanes "
                percent2={Balance[5].percent}
                value2 = {"Md "+ Balance[5].currentBal}
                subTitle3="Rallonges"
                percent3={Balance[6].percent}
                value3 = {"Md "+ Balance[6].currentBal}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                onPress={() => {}}
                disabled
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
          data={AccountMain}
          keyExtractor={(_item, index) => index.toString()}
          ListEmptyComponent={<Text> Pas de resultat </Text>}
          renderItem={({ item: itemInline, index }) => (
            <Price2Col
              key={index}
              tagAct= {itemInline.tagAct }
              //image={itemInline.image}
              code={itemInline.code}
              name={itemInline.name}
              usedBal={itemInline.usedBal}
              initialBal={itemInline.initialBal}
              percent={itemInline.percent} // consumption rate of Budget
              currentBal={itemInline.currentBal}
              isUp={itemInline.isUp}
              statusAct={itemInline.statusAct}
              onPress={() => {}}
            />
          )}
        />
        </View>
    </View>
  )
}

export default HomeScreen