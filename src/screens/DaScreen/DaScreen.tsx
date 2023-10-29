import { View, FlatList, TouchableOpacity, RefreshControl,  } from 'react-native'
import React , { useContext, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import  TextInput  from '../../components/TextInput'
import IconFont from 'react-native-vector-icons/FontAwesome5'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import Transaction2Col from '../../components/Transactions'
import colors from '../../theme/colors'
import  {haveChildren} from '../../utils/utils'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import DaStatus from '../../assets/data/DemandesAchatsFiltersStatus'
import DaActID from '../../assets/data/DemandesAchatsFiltersAct'
import DaOwner from '../../assets/data/DemandesAchatsFiltersOwner'
import SelectOptionModal from '../../components/SelectOptionModal'
import SearchOptionModal from '../../components/SearchModal'
import TabTag from '../../components/TabTag'
import PieChart from '../../components/PieChart'
import DemandesSummary from  '../../assets/data/DemandesSummary'
import EmptyList from '../../components/EmptyList'
import axios from 'axios'
import { BaseURL } from '../../assets/config/config'
import { AuthContext } from '../Context/AuthContextProvider'



const tabs = [
  {
    id: 'all',
    title: 'Toutes',
  },
  {
    id: 'projects',
    title: 'Compte',
  },
  {
    id: 'status',
    title: 'Statut',
  },
  {
    id: 'owner',
    title: 'Service',
  },
]

const DaScreen = () => {
  const insets = useSafeAreaInsets()
  const [refreshing] = useState(false)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const navigation = useNavigation()
  const { userToken } = useContext(AuthContext)
  // filter hooks 
  const [daStatus] = useState(DaStatus)
  const [daActID] = useState(DaActID)
  const [daOwner] = useState(DaOwner)

  const [actModalVisible , setActModalVisible]=useState(false)
  const [statusModalVisible , setStatusModalVisible]=useState(false)
  const [ownerModalVisible , setOwnerModalVisible]=useState(false)

  const [tab, setTab] = useState(tabs[0])
  const [ demandes , setDemandes ] = useState([])
 
  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/demandeAchats`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        console.log (res.data)
        setDemandes (res.data)
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
  
  const onAccountSelect = (option) => {
    //setActID(option)
    setActModalVisible(false)
    filterCategory(option.tag)
  }
  const onStatusSelect = (option) => {
    //setStatus(option)
    setStatusModalVisible(false)
    filterCategory(option.tag)
  }
  const onOwnerSelect = (option) => {
    //setOwner(option)
    setOwnerModalVisible(false)
    filterCategory(option.tag)
  }

  const navigateToDaDetail = (item) => () => {
    navigation.navigate('DaDetails', {item: item })
  }

  const filterCategory = (text) => {
    setCategory(text)
    if (text) {
      setCategories(demandes.filter((item) => 
      haveChildren(item.name, text) || haveChildren(item.status?.tag, text)|| 
      haveChildren(item.daNumber, text) || haveChildren(item.projectID?.projectID, text) ||
      haveChildren(item.projectID?.actID, text) || haveChildren(item.createdBy?.groupID?.groupID, text)
      ));
    } else {
      setCategories(demandes)
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
              marginVertical : 5,
            }}
        >
          <TextInput
            style = {{ flex: 1 }}
            onChangeText={filterCategory}
            placeholder={"Rechercher une demande Achat"}
            value={category}
            iconLeft = { <IconFont name = 'search' color = { colors.gray} size = {24} />}
            icon={
              <TouchableOpacity onPress={() => filterCategory('')}>
                <IconFont name="times" size={18} color={colors.gray} />
              </TouchableOpacity>
            }
          />
          {/* <TouchableOpacity style={{ paddingLeft: 20 }} onPress={goToFilter}>
            <IconFont name="sliders-h" size={26} color={colors.primary} />
          </TouchableOpacity> */}
        </View>
        {category.length > 0 ? null : (<PieChart data={DemandesSummary} />)}
        <TabTag
          style={{ paddingHorizontal: 10, paddingVertical: 10 }}
          tabs={tabs}
          tab={tab}
          onChange={(tabData) => 
            {
              setTab(tabData)
              if (tabData.id === 'all') {
                filterCategory('')
              } else if (tabData.id === 'projects') {
                setActModalVisible(true)
                //ToggleTabs(tabData.id , actID?.text)

              }else if (tabData.id === 'status') {
                setStatusModalVisible(true)
                //ToggleTabs(tabData.id , status?.text)

              }else if (tabData.id === 'owner') {
                setOwnerModalVisible(true)
                //ToggleTabs(tabData.id , owner?.text)
              }
          }
          }
        />
       
        <View style = {{ flex : 1 , width : '100%'}}>
        <FlatList
            contentContainerStyle={{}}
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
            ListEmptyComponent={({item}) => (<EmptyList  item = {category}/>) }
            data={categories}
            keyExtractor= {(item) => item.id}
            renderItem={({ item }) => (
              <Transaction2Col
                key={item.id}
                initial ={''+item.createdBy?.tag}
                reference = { item.daNumber? 'DA' + item.daNumber : 'DA' + item.reference }
                actID = {item.projectID?.projectID}
                name={item.name}
                date={item.createdAt}
                status={item.status?.status}
                price={'KX'+ (item.amountTTC / Math.pow(10,3)).toFixed(2)}
                isUp={item.isUp}
                backgroundIcon={item.createdBy?.groupID?.color?.tag}
                onPress={navigateToDaDetail(item)}
              />
            )}
        />
        </View>
      </View>
      <SearchOptionModal
          isVisible={actModalVisible}
          options={daActID}
          onChange = {onAccountSelect}
          onSwipeComplete={() => setActModalVisible(false)}
      />
      <SelectOptionModal
          isVisible={statusModalVisible}
          options={daStatus}
          onChange = {onStatusSelect}
          onSwipeComplete={() => setStatusModalVisible(false)}
      />
      <SearchOptionModal
          isVisible={ownerModalVisible}
          options={daOwner}
          onChange = {onOwnerSelect}
          onSwipeComplete={() => setOwnerModalVisible(false)}
      />
    </View>
  )
}

export default DaScreen