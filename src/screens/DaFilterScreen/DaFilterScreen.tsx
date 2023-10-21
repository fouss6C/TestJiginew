import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, View } from 'react-native'
import FilterOption from '../../components/FilterOption'
import Button from '../../components/Button'
import Text from '../../components/Text'
import colors from '../../theme/colors'
import DaStatus  from '../../assets/data/DemandesAchatsFiltersStatus'
import DaActID  from '../../assets/data/DemandesAchatsFiltersAct'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ListOptionSelected from '../../components/ListOptionSelected'
import SelectOptionModal from '../../components/SelectOptionModal'
const backArrow = '../../assets/image/back-arrow.png'

export default function DaFilter() {

  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const [daStatus] = useState(DaStatus)
  const [status, setStatus] = useState(DaStatus[0]) // for goback
  const [daActID] = useState(DaActID)
  const [actID, setActID] = useState(DaActID[0]) // for  goback
  const [actModalVisible , setActModalVisible]=useState(false)
  const insets = useSafeAreaInsets()

  const onAccountSelect = (option) => {
    setActID(option);
    setActModalVisible(false);
  }

  return (
    <View style = {{ 
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        //paddingTop: insets.top, 
        //paddingBottom: insets.bottom, 
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor : colors.white
     }}>
      <ScrollView style={{ flex : 1, width: '100%', padding: 20 , backgroundColor : colors.white }}>
        <Text title3>{'Etats de la Demande'}</Text>
        <View style={{ paddingVertical: 10 }}>
          {daStatus.map((item, index) => (
            <FilterOption
              key={index}
              style={{ paddingVertical: 5 }}
              isIcon={false}
              checked={item.id === status.id}
              title={item.title}
              onPress={() => setStatus(item)}
            />
          ))}
        </View>
        <Text title3>{'Compte de Budget'}</Text>
        <ListOptionSelected
            style={{ marginTop: 20 }}
            textLeft={'Ligne Budgetaire'}
            textRight={actID?.text}
            onPress={() =>
              setActModalVisible(true)
            }
            primary
        />
        {/* <View style={{ paddingVertical: 10 }}>
          {daActID.map((item, index) => (
            <FilterOption
              key={index}
              style={{ paddingVertical: 5 }}
              isIcon={false}
              checked={item.id === actID.id}
              title={item.title}
              name = {item.name}
              onPress={() => setActID(item)}
            />
          ))}
        </View> */}
      </ScrollView>
      <SelectOptionModal
          isVisible={actModalVisible}
          options={daActID}
          onChange = {onAccountSelect}
          onSwipeComplete={() => setActModalVisible(false)}
      />
      <Button
        style={{ marginHorizontal: 20, marginBottom: 15 ,marginTop : 1  }}
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false)
            navigation.goBack()
          }, 500)
        }}
        loading={loading}
      >
        {'Valider'}
      </Button>
    </View>
  )
}