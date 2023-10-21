import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import LabelUpper2Row from '../../components/LabelUpper2Row'
import ListMenuIcon from '../../components/ListMenuIcon'
import Text  from '../../components/Text'
import colors from '../../theme/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DachatsInfo from '../../assets/data/DemandesAchatsInfo'
import styles from './styles'
import Button from '../../components/Button'
import SelectOptionModal from '../../components/SelectOptionModal'
import daValidationStatus from '../../assets/data/DemandeAchatValidationStatus'

type detailsType = {
    id: number
    reference : string 
    name: string
    createdAt: string
    notifiedAt: string
    issuedAt : string 
    purchasedAt : string 
    motive : string
    status: string
    amountHT : string
    amountTTC : string
    prestationType : string
    isUp: boolean
    backgroundIcon: string
    daNumber: string
    providedBy: string
    createdBy : string
    createdByInitial : string
    createdByEmail : string
    createdByService : string
    createdByAvatar : string
    projectID : string
    modifiedBy : string
    bcNumber : string
}
const DaDetailsScreen = () => {

    const insets = useSafeAreaInsets()
    const [validateLoading, setValidateLoading] = useState(false)
    const [modifyLoading, setModifyLoading] = useState(false)
    const navigation = useNavigation()
    const route = useRoute()
    const [item, setItem] = useState<detailsType>(DachatsInfo)
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
    const navigateToHistory = () => {
      navigation.navigate('DaHistory', { item : item })
    }

  return (
    <View style={{ flex: 1 , backgroundColor : colors.white}}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
        >
          <View
            style={{
              marginTop: 10,
              marginBottom: 15,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
                <Text title2 style ={{ fontFamily : 'Roboto'}}>{'DA'+ DachatsInfo.daNumber } 
                    <Text subhead gray> { '#'+DachatsInfo.createdByService }
                    </Text>
                </Text>
              <Text title3 style={{ marginTop: 20 }}>
                {DachatsInfo.name}
              </Text>
            </View>
            <TouchableOpacity  style={{ alignItems: 'center', justifyContent:'center' , borderRadius : 20 , backgroundColor: DachatsInfo.isUp? colors.green : colors.primary,  width: 40, height: 40 }} >
                <Text headline1 white style={{ transform: [{ rotate: "315deg" }] }} > {DachatsInfo.createdByInitial} </Text>
            </TouchableOpacity>
          </View>
          <Text body2>
            {DachatsInfo.motive}
          </Text>
          <Text subhead gray style={{ marginTop: 15 , marginLeft : 'auto' }} >
            crée le {DachatsInfo.createdAt}
          </Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
              paddingTop: 15,
              paddingBottom: 5,
            }}
          >
            <Text title3>{'References'}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={'Identifiant DA'} value={DachatsInfo.reference}/>
              <LabelUpper2Row style={{ flex: 1 }} label={'Ligne de compte'} value={DachatsInfo.projectID} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={'Type Prestation'} value={DachatsInfo.prestationType} />
              <LabelUpper2Row style={{ flex: 1 }} label={'Montant TTC'} value={DachatsInfo.amountTTC} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={'Bon de commande'} value={'BC'+DachatsInfo.bcNumber} />
              <LabelUpper2Row style={{ flex: 1 }} label={'Statut'} value={DachatsInfo.status} />
            </View>
          </View>
          <Text title3>{'Annexes'}</Text>
          <ListMenuIcon style={{ paddingTop: 20 }} icon={'add-business'} iconColor = {colors.primary}  title={DachatsInfo.providedBy} />
          <ListMenuIcon 
            style={{ paddingVertical: 10 }} 
            icon={'history'} iconColor = {colors.primary} 
            title={'Voir historique des changements'} 
            onPress={navigateToHistory}
          />
          <ListMenuIcon style={{ paddingVertical: 10 }} icon={'upload-file'} iconColor = {colors.primary} title={'Voir l\'offre du fournisseur'} />
        </ScrollView>
      </View>
      <View style = {{ flexDirection : 'row', marginVertical: 20 }}>
        <Button
            style={{ flex : 1, marginLeft : 20, marginRight: 5 , }}
            onPress={() => {
                setValidateLoading(true);
                setTimeout(() => {
                setValidateLoading(false)
                setStatusModalVisible(true)
                }, 10)
            }}
            loading={validateLoading}
            outline
            >
            {'Valider'}
        </Button>
        <Button
            style={{ flex : 1, marginLeft: 5 , marginRight: 20,  }}
            onPress={() => {
                setModifyLoading(true);
                setTimeout(() => {
                setModifyLoading(false)
                
                }, 100)
            }}
            loading={modifyLoading}
            >
            {'Modifier'}
        </Button>
        <SelectOptionModal
            isVisible={statusModalVisible}
            options={daValidationStatus}
            onChange = {onDaStatusSelect}
            onSwipeComplete={() => setStatusModalVisible(false)}
        />
        </View>

    </View>
  );
};

export default DaDetailsScreen