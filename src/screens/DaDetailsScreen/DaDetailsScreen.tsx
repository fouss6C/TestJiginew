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
    motivation : string 
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
    const [item, setItem] = useState<detailsType>(route?.params?.item)
    const [statusSelected , setStatusSelected] = useState('')
    const [statusModalVisible , setStatusModalVisible] = useState(false)

    useEffect(() => {
        if (route?.params?.item) {
          // get the DA information from API , by ID 
          setItem(route?.params?.item)
          navigation.setOptions({
            headerTitle : route?.params?.item.daNumber ? 'DA '+ route?.params?.item.daNumber : route?.params?.item.reference 
          })
        }
    }, [route?.params?.item])

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

    const onDaStatusSelect = (option , x = item.id) => {
        setStatusSelected(option);
        setStatusModalVisible(false);
        // render an Alert Message with the new Status for validation 
        Alert.alert('Validation DA ', 'Souhaitez-vous faire passer cette demande  à ' + option.text,
        [
          {
            text: 'Annuler',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Confirmer', 
            onPress: () => changeStatusDa( x , option.id)
          },
        ])
    }
    const changeStatusDa = (daID , statusID) => {
      console.log ( '' + daID + '   ' + statusID )
    }
    
    const navigateToDaEdit = () => {
      navigation.navigate('DaEdit', { item : route?.params?.item })
    }
    const navigateToHistory = () => {
      navigation.navigate('DaHistory', {item : item })
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
              <Text title2 style ={{ fontFamily : 'Roboto'}}>{ item.daNumber ? 'DA '+ item.daNumber : item.reference } 
                  <Text subhead gray> { '#'+ item?.createdBy?.group.name }
                  </Text>
              </Text>
              <Text title3 style={{ marginTop: 20 }}>
              {item?.name}
              </Text>
            </View>
            <TouchableOpacity  style={{ alignItems: 'center', justifyContent:'center' , borderRadius : 20 , backgroundColor: item.isUp? colors.green : colors.primary,  width: 40, height: 40 }} >
                <Text headline1 white style={{ transform: [{ rotate: "315deg" }] }} > {item.createdBy.tag} </Text>
            </TouchableOpacity>
          </View>
          <Text body2>
            {item.motivation}
          </Text>
          <Text subhead gray style={{ marginTop: 15 , marginLeft : 'auto' }} >
            crée le { formatDate ( item.createdAt ) }
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
              <LabelUpper2Row style={{ flex: 1 }} label={'Identifiant DA'} value={item.reference}/>
              <LabelUpper2Row style={{ flex: 1 }} label={'Ligne de compte'} value={item.project.projectNumber} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={'Type Prestation'} value={item.prestationType} />
              <LabelUpper2Row style={{ flex: 1 }} label={'Montant TTC'} value={'XOF '+ item.amountTTC} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={'Bon de commande'} value={'BC'+item.bcNumber} />
              <LabelUpper2Row style={{ flex: 1 }} label={'Statut'} value={item.status.status} />
            </View>
          </View>
          <Text title3>{'Annexes'}</Text>
          <ListMenuIcon style={{ paddingTop: 20 }} icon={'add-business'} iconColor = {colors.primary}  title={item.providedBy.name} />
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
            onPress={navigateToDaEdit}
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