import { View, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator,  } from 'react-native'
import React , { useContext, useEffect, useMemo, useState } from 'react'
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
import ProjectCard01 from '../../components/ProjectCard/ProjectCard01'



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
  const [refreshing ] = useState(false)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const navigation = useNavigation()
  const { userToken } = useContext(AuthContext)
  // filter hooks 
  const [daStatus, setDaStatus] = useState([])
  const [daActID , setDaActID ] = useState([])
  const [daOwner , setDaOwner] = useState([])
  
  const [loadingAcct , setLoadingAcct] = useState(true)
  const [loadingGroup , setLoadingGroup] = useState(true)

  const [actModalVisible , setActModalVisible]=useState(false)
  const [statusModalVisible , setStatusModalVisible]=useState(false)
  const [ownerModalVisible , setOwnerModalVisible]=useState(false)

  const [tab, setTab] = useState(tabs[0])
  const [ demandes , setDemandes ] = useState([])
  const [ demandeSummary , setDemandeSummary ] = useState([])

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
  }, [refreshing])
  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/demandeAchats/summary`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        console.log (res.data)
        setDemandeSummary (() => {
          return res.data.map((item) => 
            {
              let x = { 
                "name" :item.name, //item.name.includes('Interne') ? 'Interne' : item.name , 
                "population" : item.population , 
                "description" : item.description , 
                "tag" : item.tag.includes('InternalApproval') ? 'InternalApproval' :item.tag ,
                "color" : item.legendFontColor, 
                "legendFontColor" : "#7F7F7F"
              }

              return x
            }
          )
        }
        )
        console.log ( res.data)
      }).catch((error)=> {
        if( error.code == 'ERR_BAD_REQUEST') {
          //Alert.alert( 'No response from server , check the URL ..')
          console.log('Problème de chargement du rapport des demandes'+error.message)
        } else {
         // Alert.alert(error.message)
         console.log(error.message)
        }
        //console.log(error.code)
      }).then( function () {
        //
      })
    }
    response()
  }, [])

  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/projets/projectIDs`,
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
                tag : item.projectID, 
                text : item.name, 
                description : item.name,
              }
              return x
            }
          )
        }
        setDaActID(formatProjectList)
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

  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/daStatuses`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        console.log (res.data)
        const formatStatusList = () => {
          return res.data.map((item) => 
            {
              let x = { 
                id : item.id,
                iconName: item.id == 1 ? 'plus-circle' : 'minus-circle' ,
                iconColor: item.id <= 4 ? colors.primary : colors.secondary,
                tag : item.tag, 
                text : item.status, 
                description : '',
              }
              return x
            }
          )
        }
        setDaStatus(formatStatusList)
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
        setDaOwner(formatGroupList)
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

  const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}
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
    navigation.navigate('DaDetails', { item: item })
  }

  const filterCategory = (text) => {
    setCategory(text)
    if (text) {
      setCategories(demandes.filter((item) => 
      haveChildren(item.name, text) || haveChildren(item.status?.tag, text)|| 
      haveChildren(item.daNumber, text) || haveChildren(item.project?.projectNumber, text) ||
      haveChildren(item.project?.acctID, text) || haveChildren(item.createdBy?.group?.groupID, text)
      || haveChildren(item.reference, text)
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
        {category.length > 0 ? null : (<PieChart data={demandeSummary} />)}
        <TabTag
          style={{ paddingHorizontal: 1, paddingVertical: 20 }}
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
            contentContainerStyle={[ styles.paddingFlatList ]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={()=> {}}
              />
            }
            ListEmptyComponent={({item}) => 
             category ? (<EmptyList  item = {category}/>) : 
            (<ActivityIndicator animating={true} color={colors.primary} />)
          }
            data={categories}
            keyExtractor= {(item) => item.id}
            renderItem={({ item }) => (
              <ProjectCard01
                title={ (item.name).slice(0, 27) + '..'}
                description={ (item.motivation).slice(0, 86) + '...' }
                days={item.status?.status}
                status = { item.status.id }
                reference = { item.daNumber? 'DA'+item.daNumber : item.reference }
                label = { formatDate (item.createdAt) }
                //members={item.members}
                progress={'MX'+ (item.amountTTC / Math.pow(10,6)).toFixed(2)}
                onPress={navigateToDaDetail(item)}
                style={{
                  marginBottom: 10,
                }}
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
          options={ daActID }
          onChange = {onAccountSelect}
          onSwipeComplete={() => setActModalVisible(false)}
        />
        ) : (
          <>
          </>
        )

      }
      {
        !loadingGroup ?
        (
        <SearchOptionModal
          isVisible={ownerModalVisible}
          options={daOwner}
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
          isVisible={statusModalVisible}
          options={daStatus}
          onChange = {onStatusSelect}
          onSwipeComplete={() => setStatusModalVisible(false)}
      />
    </View>
  )
}

export default DaScreen