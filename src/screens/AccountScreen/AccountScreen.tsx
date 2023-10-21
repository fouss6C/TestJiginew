import { View, FlatList, TouchableOpacity, RefreshControl, Alert,  } from 'react-native'
import React , { useState } from 'react'
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
  const [refreshing] = useState(false)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState(ProjectLine)
  const navigation = useNavigation<RootNavigationProp>()
  // filter hooks 
  /* const [actStatus] = useState(ActStatus)
  const [actID] = useState(ActID)
  const [actOwner] = useState(ActOwner) */

  const [actModalVisible , setActModalVisible]=useState(false)
  const [typeModalVisible , setTypeModalVisible]=useState(false)
  const [ownerModalVisible , setOwnerModalVisible]=useState(false)

  const [tab, setTab] = useState(tabs[0])
  
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

    navigation.navigate('AccountDetails' , { item : option})
  }

  const filterCategory = (text) => {
    setCategory(text)
    if (text) {
      setCategories(ProjectLine.filter((item) => 
      haveChildren(item.name, text) || haveChildren(item.typeAct, text)|| 
      haveChildren(item.codeAct, text) || haveChildren(item.projectID, text)
      ))
    } else {
      setCategories(ProjectLine)
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
                ListEmptyComponent={({item}) => (<EmptyList  item = {category}/>) }
                renderItem={({ item: itemInline, index }) => (
                    <Price2Col
                        key={index}
                        tagAct= {itemInline.tagAct }
                        //image={itemInline.image}
                        code={itemInline.projectID}
                        name={itemInline.name}
                        usedBal={itemInline.usedBal}
                        initialBal={itemInline.initialBal}
                        percent={itemInline.percent} // consumption rate of Budget
                        currentBal={itemInline.currentBal}
                        isUp={itemInline.isUp}
                        statusAct={itemInline.statusAct}
                        transactionType= {itemInline.transactionType}
                        transactionAmount= { itemInline.transactionAmount}
                        transactionDate= {  itemInline.transactionDate}
                        transactionOperator= { itemInline.transactionOperator}
                        transactionActOwner= { itemInline.owner}
                        transactionAct= { itemInline.codeAct}
                        //onPress={() => {}}
                        onPressDetails = { () => {navigateToDetails(itemInline)}}
                    />
                )}
            />
        
        </View>
      </View>
      <SearchOptionModal
          isVisible={actModalVisible}
          options={ActID}
          onChange = {onAccountSelect}
          onSwipeComplete={() => setActModalVisible(false)}
      />
      <SelectOptionModal
          isVisible={typeModalVisible}
          options={ActType}
          onChange = {onTypeSelect}
          onSwipeComplete={() => setTypeModalVisible(false)}
      />
      <SearchOptionModal
          isVisible={ownerModalVisible}
          options={ActOwner}
          onChange = {onOwnerSelect}
          onSwipeComplete={() => setOwnerModalVisible(false)}
      />
    </View>
  )
}

export default AccountScreen