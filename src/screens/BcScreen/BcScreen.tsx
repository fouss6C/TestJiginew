import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Alert, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'
//import  commandes  from '../../assets/data/CommandesList'
import commandesSummary from  '../../assets/data/CommandesSummary'
import colors from '../../theme/colors'
import {enableExperimental, haveChildren} from  '../../utils/utils'
import PieChart from '../../components/PieChart'
import ProjectCard from '../../components/ProjectCard'
import  TabTag from '../../components/TabTag'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInput from '../../components/TextInput'
import IconFont from 'react-native-vector-icons/FontAwesome5'
import Text from '../../components/Text'
import EmptyList from '../../components/EmptyList'
import { BaseURL } from '../../assets/config/config'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContextProvider'

const BcScreen = (props) => {
  const { navigation } = props
  const [refreshing] = useState(false)
  const insets = useSafeAreaInsets()
  const [category, setCategory] = useState('')
  const { userToken } = useContext(AuthContext)
  const [commandes, setCommandes] = useState([])

  const tabs = [
    {
      id: 'all',
      title: 'Tous',
    },
    {
      id: 'ongoing',
      title: 'En cours',
    },
    {
      id: 'completed',
      title: 'Realisé',
    },
    {
      id: 'onhold',
      title: 'En suspens',
    },
  ]
  const [tab, setTab] = useState(tabs[0])


  const filterCategory = (text) => {
    setCategory(text)
    if (text) {
      //
    }
  }
  
  useEffect( () => {
    const response = async () => {
      await axios.get(`${BaseURL}/bonCommandes`,
    { headers: {
      //'Content-Type': 'multipart/form-data' , 
      'Authorization' : `Bearer ${userToken?.access_token}`,
      'Accept' : 'application/json'
    }}
    ).then(res => {
        console.log (res.data)
        setCommandes(res.data)
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
  const projects = useMemo(() => {
    enableExperimental()
    const filterCommand = (cmd ) => {
      return category? cmd.filter((item) => haveChildren(item.name, category) || haveChildren(item.status.tag, category)|| haveChildren(item.jalon, category) || haveChildren(item.bcNumber, category)) : cmd
    }
    if (tab.id === 'all') {
      return  filterCommand(commandes)
    } else {
      return filterCommand (commandes.filter((item) => item.status.tag === tab.id))
    }
  }, [tab,category,commandes])

  const navigateToProjectDetail = (item) => () => {
    navigation.navigate('BcDetails', {item : item })
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
        <View style = { styles.container} >
          <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical : 5
              }}
          >
            <TextInput
              style = {{ flex: 1 }}
              onChangeText={filterCategory}
              placeholder={"Rechercher une commande "}
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
          {category.length > 0 ? null : (<PieChart data={commandesSummary} />)}
          <TabTag
            style={{ paddingBottom: 20 }}
            tabs={tabs}
            tab={tab}
            onChange={(tabData) => setTab(tabData)}
          />
          <FlatList
            contentContainerStyle={styles.paddingFlatList}
            data={projects}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={() => {}}
              />
            }
            ListEmptyComponent={({item}) => (<EmptyList  item = {category}/>) }
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item }) => (
              <ProjectCard
                title={item.name}
                description={item.context}
                days={item.days+' jours'}
                reference = { 'BC '+item.bcNumber}
                label = { item.jalon}
                //members={item.members}
                progress={item.executionRate}
                onPress={navigateToProjectDetail(item)}
                style={{
                  marginBottom: 10,
                }}
              />
            )}
          />
        </View>
      </View>
    )
}
export default BcScreen