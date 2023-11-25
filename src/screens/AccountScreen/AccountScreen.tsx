import { View, FlatList, TouchableOpacity, RefreshControl, Alert, ActivityIndicator } from 'react-native'
import React , { useContext, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ProjectLine from '../../assets/data/ProjectsLine'
import  TextInput  from '../../components/TextInput'
import IconFont from 'react-native-vector-icons/FontAwesome5'
import Price2Col from '../../components/Price2Col/Price2ColExpand'
import colors from '../../theme/colors'
import  {haveChildren} from '../../utils/utils'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import ActType from '../../assets/data/ProjectLineType'
import ActID from '../../assets/data/DemandesAchatsFiltersAct'
import ActOwner from '../../assets/data/DemandesAchatsFiltersOwner'
import SelectOptionModal from '../../components/SelectOptionModal'
import SearchOptionModal from '../../components/SearchModal'
import TabTag from '../../components/TabTag'
import EmptyList from '../../components/EmptyList'
import { RootNavigationProp } from '../../types/Navigation'
import axios from 'axios'
import { BaseURL } from '../../assets/config/config'
import { AuthContext } from '../Context/AuthContextProvider'

const tabs = [
  {
    id: 'all',
    title: 'Tous',
  },
  {
    id: 'account',
    title: 'Compte',
  },
  {
    id: 'type',
    title: 'Type',
  },
  {
    id: 'owner',
    title: 'Service',
  },
]

const AccountScreen = () => {
  const insets = useSafeAreaInsets()
  const { userToken } =useContext(AuthContext)
  const [refreshing] = useState(false)
  const [projectLine , setProjectLine ] = useState([])
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const navigation = useNavigation<RootNavigationProp>()
  // filter hooks 

  const [actID , setActID ] = useState([])
  const [group , setGroup] = useState([])
  const [loadingAcct , setLoadingAcct] = useState(true)
  const [loadingGroup , setLoadingGroup] = useState(true)

  const [actModalVisible , setActModalVisible]=useState(false)
  const [typeModalVisible , setTypeModalVisible]=useState(false)
  const [ownerModalVisible , setOwnerModalVisible]=useState(false)

  const [tab, setTab] = useState(tabs[0])

  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/projets`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        console.log (res.data)
        setProjectLine(res.data)
        setCategories(res.data)
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

  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/groupes`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        console.log (res.data)
        const formatGroupList = () => {
          return res.data.map((item) => 
            {
              let x = { 
                  id : item.id,
                  iconName: item.id ==1 ? 'plus-circle' : 'minus-circle' ,
                  iconColor: item.id < 4 ? colors.primary : colors.secondary,
                  tag : item.groupID, 
                  text : item.name, 
                  description : item.tag,
              }
              return x
            }
          )
        }
        setGroup(formatGroupList)
        setLoadingGroup(false)
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

  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/accounts/accountIDs`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        console.log (res.data)
        const formatProjectList = () => {
          return res.data.map((item) => 
            {
              let x = { 
                id : item.id,
                iconName: item.id ==1 ? 'plus-circle' : 'minus-circle' ,
                iconColor: colors.primary,
                tag : item.acctID, 
                text : item.name, 
                description : '',
              }
              return x
            }
          )
        }
        setActID(formatProjectList)
        setLoadingAcct(false)

      }).catch((error)=> {
        if( error.code == 'ERR_BAD_REQUEST') {
          //Alert.alert( 'No response from server , check the URL ..')
          console.log(error.message)
        } else {
         // Alert.alert(error.message)
         console.log(error.message)
        }
      }
      ).then( function () {
        //
      })
    }
    response()
  }, [])
  
  const onAccountSelect = (option) => {
    //setActID(option)
    setActModalVisible(false)
    filterCategory(option.tag)
  }
  const onTypeSelect = (option) => {
    //setStatus(option)
    setTypeModalVisible(false)
    filterCategory(option.tag)
  }
  const onOwnerSelect = (option) => {
    //setOwner(option)
    setOwnerModalVisible(false)
    filterCategory(option.tag)
  }

  const navigateToDetails = (option) => {

    navigation.navigate('AccountDetails', { item : option})
  }

  const filterCategory = (text) => {
    setCategory(text)
    if (text) {
      setCategories(projectLine.filter((item) => 
      haveChildren(item.name, text) || haveChildren(item.type, text)|| 
      haveChildren(item.acctID, text) || haveChildren(item.projectNumber, text)
      || haveChildren(item.group.tag, text)
      ))
    } else {
      setCategories(projectLine)
      setTab(tabs[0])
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // Paddings to handle safe area
        //paddingTop: insets.top,
        //paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style = {styles.container}>
        <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical : 10,
            }}
        >
          <TextInput
            style = {{ flex: 1 }}
            onChangeText={filterCategory}
            placeholder={"Rechercher une ligne budgetaire"}
            value={category}
            iconLeft = { <IconFont name = 'search' color = { colors.gray} size = {24} />}
            icon={
              <TouchableOpacity onPress={() => filterCategory('')}>
                <IconFont name="times" size={18} color={colors.gray} />
              </TouchableOpacity>
            }
          />
        </View>
        <TabTag
          style={{ paddingHorizontal: 10, paddingBottom: 20 }}
          tabs={tabs}
          tab={tab}
          onChange={(tabData) => 
            {
              setTab(tabData)
              if (tabData.id === 'all') {
                filterCategory('')
              } else if (tabData.id === 'account') {
                setActModalVisible(true)

              }else if (tabData.id === 'type') {
                setTypeModalVisible(true)

              }else if (tabData.id === 'owner') {
                setOwnerModalVisible(true)
              }
          }
          }
        />
       
        <View style = {{ flex : 1 , width : '100%' , marginTop : 5}}>
            <FlatList
                contentContainerStyle={{ 
                    //paddingHorizontal: 5
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
                data={categories}
                keyExtractor={(_item, index) => index.toString()}
                ListEmptyComponent={({item}) => 
                category ? (<EmptyList  item = {category}/>) : 
                (<ActivityIndicator animating={true} color={colors.primary} />)
              }
                renderItem={({ item: itemInline, index }) => (
                    <Price2Col
                      key={index}
                      tagAct= {itemInline.group.tag }
                      //image={itemInline.image}
                      code={itemInline.projectNumber}
                      name={itemInline.name}
                      usedBal={(itemInline.amountTTC - itemInline.balance) +''}
                      initialBal={(itemInline.amountTTC / Math.pow(10,6)).toFixed(2) + 'MX'}
                      percent={ (Math.abs(itemInline.amountTTC - itemInline.balance) * 100 / itemInline.amountTTC).toFixed(2) + '%' } // consumption rate of Budget
                      currentBal={'MX'+ (itemInline.balance / Math.pow(10,6)).toFixed(2)}
                      isUp={itemInline.balance >= itemInline.amountTTC ? true : false }
                      statusAct={''}
                      transactionType= { itemInline.transferts[0]?.type }
                      transactionAmount= { itemInline.transferts[0]?.amount}
                      transactionDate= {"2023-03-20 00:00"}
                      transactionOperator= { itemInline.transferts[0]?.createdBy } 
                      transactionActOwner= { itemInline.group.name}
                      transactionAct= {'20002'}
                      //onPress={() => {}}
                      onPressDetails = { () => {navigateToDetails(itemInline)}}
                    />
                )}
            />
        
        </View>
      </View>
      {
        !loadingAcct ?
        (
        <SearchOptionModal
          isVisible={actModalVisible}
          options={actID}
          onChange = {onAccountSelect}
          onSwipeComplete={() => setActModalVisible(false)}
        />
        ) : 
        (
          <>
          </>
        )
      }
      {
        !loadingGroup ?
        (
          <SearchOptionModal
            isVisible={ownerModalVisible}
            options={group}
            onChange = {onOwnerSelect}
            onSwipeComplete={() => setOwnerModalVisible(false)}
          />
        ) :
        (
          <>
          </>
        )
      }
      <SelectOptionModal
        isVisible={typeModalVisible}
        options={ActType}
        onChange = {onTypeSelect}
        onSwipeComplete={() => setTypeModalVisible(false)}
      />
    </View>
  )
}

export default AccountScreen