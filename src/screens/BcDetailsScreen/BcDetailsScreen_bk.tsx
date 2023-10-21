import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import ProductSpecGrid from '../../components/ProductSpecGrid'
import Tag from '../../components/Tag'
import Text from '../../components/Text'
import colors from '../../theme/colors'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import  Commandes  from '../../assets/data/CommandesList'
import ProfileAuthor from '../../components/ProfileAuthor'
import SelectOptionModal from '../../components/SelectOptionModal'
import bcStatus from '../../assets/data/CommandesStatus'
import ListSearchResultLabel from '../../components/ListSearchResultLabel'
import Button from '../../components/Button'
import ListMenuIcon from '../../components/ListMenuIcon'

const BcDetailsScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [loading , setLoading]=useState(false)
    const [statusSelected , setStatusSelected] = useState('')
    const [statusModalVisible , setStatusModalVisible] = useState(false)

    const insets = useSafeAreaInsets()
    const [item, setItem] = useState(Commandes[0])
    
    useEffect(() => {
        if (route?.params?.item) {
          setItem(route?.params?.item)
          navigation.setOptions({headerTitle :'BC '+ route?.params?.item.bcNumber })
        }
    }, [route?.params?.item])

    const onBcStatusSelect = (option) => {
      setStatusSelected(option);
      setStatusModalVisible(false);
      // render an Alert Message with the new Status for validation 
      Alert.alert('Changement de Statut BC', 'Merci de bien vouloir confirmer ?', 
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])
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
          backgroundColor : colors.white
        }}
    >
      <ScrollView
        style ={[{ flex : 1 , width: '100%', }]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
      >
      <View style = {styles.container }>
      
        <ProfileAuthor
            style={{}}
            //image={}
            name={item.createdByName } //
            description={item.createdByService + '-'+ item.createdByEmail}  //  +'-'+ item.createdByEmail
            textRight={item.status}
            styleRight ={{
              color : item.isUp? colors.green : colors.red , 
              borderColor : item.isUp? colors.green : colors.red 
            }}
            onPress={() => {setStatusModalVisible(true)}}
        />
        
        <Text headline bold >{item.title}</Text>
        <Text caption1 light style={{ paddingVertical: 5 }}>
          {item.description}
        </Text>
        <ListSearchResultLabel
          style={styles.listResult}
          title={'Reference'}
          textLeft={'BC '+ item.bcNumber + ' - DA '+item.daNumber}
          textRight={item.purchasedAt}
          styleLeft= {styles.styleLeft}
          styleRight={styles.styleRight}
          onPress={() => {}}
        />
        <ListSearchResultLabel
          style={styles.listResult}
          title={'Budget'}
          textLeft={'XOF '+item.amountTTC} // DachatsInfo.amountTTC
          textRight={'Jalon '+item.jalon + ' ( '+item.days+' J)'} //
          styleLeft= {styles.styleLeft}
          styleRight={styles.styleRight}
          onPress={() => {}}
        />
        <ListSearchResultLabel
          style={styles.listResult}
          title={'Type de prestation'}
          textLeft={item.prestationType} //DachatsInfo.prestationType
          textRight={''}
          styleLeft= {styles.styleLeft}
          styleRight={styles.styleRight}
          onPress={() => {}}
        />
        <ListSearchResultLabel
          style={styles.listResult}
          title={'Realisations'}
          textLeft={item.assets} //DachatsInfo.prestationType
          textRight={''}
          styleLeft= {styles.styleLeft}
          styleRight={styles.styleRight}
          onPress={() => {}}
        />
        <ListSearchResultLabel
          style={styles.listResult}
          title={'Prochaine Etape'}
          textLeft={item.nextStep} //DachatsInfo.prestationType
          textRight={''}
          styleLeft= {styles.styleLeft}
          styleRight={styles.styleRight}
          onPress={() => {}}
        />
        <View style={styles.listContainer}>
          <Text subhead primary >
            {'Progression'}
          </Text>
          <View style = {styles.content}>
            <Text style = {styles.styleLeft} black >{'Taux de Realisation '}</Text>
            <Text style = {styles.styleRight} black>{item.executionRate+'%'}</Text>
          </View>
          <View style = {styles.content}>
            <Text style = {styles.styleLeft} black>{'Taux de Reception '}</Text>
            <Text style = {styles.styleRight} black>{item.acceptanceRate+'%'}</Text>
          </View>
          <View style = {styles.content}>
            <Text style = {styles.styleLeft} black>{'Taux d\'Immobilisation '}</Text>
            <Text style = {styles.styleRight}black>{item.savingRate+'%'}</Text>
          </View>
        </View>
        <Text body2 primary style={{ marginTop: 10 }}>
              {''}
        </Text>
        <ListMenuIcon style={{ paddingVertical: 5 }} icon={'add-business'} iconColor = {colors.black} title={item.providedBy} />
        <ListMenuIcon style={{ paddingVertical: 5 }} icon={'history'} iconColor = {colors.gray} title={'Voir Historique des réalisations'} />
        <ListMenuIcon style={{ paddingVertical: 5 }} icon={'upload-file'} iconColor = {colors.primary} title={'Voir le dossier Immobilisation'} />
    </View>
    </ScrollView>
      <Button
          style={{ marginHorizontal: 20, marginBottom: 20 ,marginTop : 1  }}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false)
              //navigationToEditScreen ()
            }, 500)
          }}
          loading={loading}
        >
        {'Modifier'}
      </Button>
      <SelectOptionModal
          isVisible={statusModalVisible}
          options={bcStatus}
          onChange = {onBcStatusSelect}
          onSwipeComplete={() => setStatusModalVisible(false)}
      />
      
    </View>
  )
}
export default BcDetailsScreen
