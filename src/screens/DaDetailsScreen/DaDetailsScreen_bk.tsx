import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import colors from '../../theme/colors'
import Text  from '../../components/Text'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ListMenuIcon from '../../components/ListMenuIcon'
import ListSearchResultLabel from '../../components/ListSearchResultLabel'
import ProfileAuthor from '../../components/ProfileAuthor'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import DachatsInfo from '../../assets/data/DemandesAchatsInfo'
import Button from '../../components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import SelectOptionModal from '../../components/SelectOptionModal'
import daStatus from '../../assets/data/DemandesAchatStatus'

const DaDetailsScreen = ({  }) => {

  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()
  const [item, setItem] = useState(DachatsInfo)

  // hook for Modal Status 
  const [statusSelected , setStatusSelected] = useState('')
  const [statusModalVisible , setStatusModalVisible] = useState(false)

  useEffect(() => {
    if (route?.params?.item) {
      // get the DA information from API , by ID 
      setItem(route?.params?.item)
      navigation.setOptions({headerTitle :'DA '+ route?.params?.item.daNumber })
    }
}, [route?.params?.item])

  const onDaStatusSelect = (option) => {
    setStatusSelected(option);
    setStatusModalVisible(false);
    // render an Alert Message with the new Status for validation 
    Alert.alert('Changement de Statut DA ', 'Merci de bien vouloir confirmer ?', 
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

  const navigationToEditScreen = ()=>{
    navigation.navigate('DaForm')
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
        <ScrollView  style = { [{ flex : 1 , width: '100%', }]}>
        <View style = { styles.container}>
          <ProfileAuthor
            style={{}}
            //image={}
            name={DachatsInfo.createdBy}
            description={DachatsInfo.createdByService +'-'+ DachatsInfo.createdByEmail}
            textRight={DachatsInfo.status}
            styleRight ={{
              color : DachatsInfo.isUp? colors.green : colors.red , 
              borderColor : DachatsInfo.isUp? colors.green : colors.red 
            }}
            onPress={() => {setStatusModalVisible(true)}}
          />
          <Text headline bold >
            {DachatsInfo.name}
          </Text>
          <Text caption1 style = {{ marginTop : 5}}> {DachatsInfo.motive} </Text>
          <ListSearchResultLabel
            style={styles.listResult}
            title={'Reference'}
            textLeft={DachatsInfo.refer}
            textRight={DachatsInfo.createdAt}
            styleLeft= {{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            styleRight={{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            onPress={() => {}}
          />
          <ListSearchResultLabel
            style={styles.listResult}
            title={'Montant'}
            textLeft={''+DachatsInfo.amountHT}
            textRight={''+DachatsInfo.amountTTC}
            styleLeft= {{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            styleRight={{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            onPress={() => {}}
          />
          <ListSearchResultLabel
            style={styles.listResult}
            title={'Type de prestation'}
            textLeft={DachatsInfo.prestationType}
            textRight={''}
            styleLeft= {{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            styleRight={{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            onPress={() => {}}
          />
          <ListSearchResultLabel
            style={styles.listResult}
            title={'Demande ID'}
            textLeft={ 'DA '+ DachatsInfo.daNumber}
            styleLeft= {{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            styleRight={{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            textRight={'Compte '+ DachatsInfo.projectID}
            onPress={() => {}}
          />
          <ListSearchResultLabel
            style={styles.listResult}
            title={'Commande ID'}
            textLeft={'BC ' +DachatsInfo.bcNumber}
            styleLeft= {{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            styleRight={{color : colors.black , fontWeight : '300' , fontFamily: 'Poppins-Light'}}
            textRight={DachatsInfo.notifiedAt}
            onPress={() => {}}
          />
          <Text body2 primary style={{ marginTop: 10 }}>
            {''}
          </Text>
          <ListMenuIcon style={{ paddingVertical: 5 }} icon={'add-business'}iconColor = {colors.black}  title={DachatsInfo.providedBy} />
          <ListMenuIcon style={{ paddingVertical: 10 }} icon={'history'} iconColor = {colors.gray} title={'Voir Historique des changements'} />
          <ListMenuIcon style={{ paddingVertical: 10 }} icon={'upload-file'} iconColor = {colors.primary} title={'Voir l\'Offre du Fournisseur'} />
        </View>
        </ScrollView>
        <Button
          style={{ marginHorizontal: 20, marginBottom: 20 ,marginTop : 1  }}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false)
              navigationToEditScreen ()
            }, 500)
          }}
          loading={loading}
        >
        {'Modifier'}
        </Button>
        <SelectOptionModal
            isVisible={statusModalVisible}
            options={daStatus}
            onChange = {onDaStatusSelect}
            onSwipeComplete={() => setStatusModalVisible(false)}
        />
      </View>
    )
  }

export default DaDetailsScreen