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
import daStatus from '../../assets/data/DemandesAchatStatus'
import  Commandes  from '../../assets/data/CommandesList'
import bcStatus from '../../assets/data/CommandesStatus'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type detailsType = {
    id: number
    name: string 
    context: string 
    days: string
    executionRate: number 
    savingRate: number
    acceptanceRate: number
    status : {
      id : number 
      status : string
      tag : string 
    } 
    isUp:boolean 
    jalon : string 
    bcNumber: string 
    initialDeadline: string 
    createdAt: string 
    purchasedAt: string
    createdBy : string 
    createdByName: string 
    createdByService: string 
    createdByEmail: string 
    providedBy : {
      id : number
      name : string
      tag : string 
    }
    assets: string 
    nextStep: string 
    amountTTC: string
    amountHT: string
    daNumber : string
    prestationType: string
    projectID: string
}
const BcDetailsScreen = () => {

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
          setItem(route?.params?.item)
          navigation.setOptions({headername :'BC '+ route?.params?.item.bcNumber })
        }
    }, [route?.params?.item])

    const navigateToBcEdit = () => {
      navigation.navigate('BcEdit' , { item : route?.params?.item })
    }

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
    <View style={{ flex: 1 , backgroundColor : colors.white}}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          <View
            style={{
              marginTop: 10,
              marginBottom: 15,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
                <Text title2 style ={{fontFamily : 'Roboto'}}>{'BC'+ item.bcNumber } 
                    <Text subhead gray> {'#'+item.createdByService } 
                    </Text>
                </Text>
              <Text title3 style={{ marginTop: 20 }}>
                {item.name}
              </Text>
            </View>
            {/* initial info of the owner */}
            <TouchableOpacity  style={{ alignItems: 'center', justifyContent:'center' , borderRadius : 20 , backgroundColor: DachatsInfo.isUp? colors.green : colors.primary,  width: 40, height: 40 }} >
                <Text headline1 white style={{ transform: [{ rotate: "315deg" }] }} > {'NP'} </Text>
            </TouchableOpacity>
          </View>
          <Text body2>
            {item.context}
          </Text>
          <Text subhead gray style={{ marginTop: 15 , marginLeft : 'auto' }} >
            notifié le {item.createdAt}
          </Text>
          <View
            style={{
              marginTop: 5,
              marginBottom: 15,
              borderTopWidth: 1,
              //borderBottomWidth: 1,
              borderTopColor: colors.border,
              paddingTop: 10,
              //paddingBottom: 1,
            }}
          >
            <Text title3>{'Highlight & NextStep'}</Text>
            <Text gray style={{ marginVertical: 5 }} >
            {item.assets}
            </Text>
            <View style = {{ flexDirection : 'row',  alignItems:'center'}}>
                <Text callout  gray style = {{ textDecorationLine : 'underline'}}>
                {'Next Step'} 
                </Text>
                <Icon name = 'arrow-right-thin' size = { 24 } color = { colors.primary} />
                <Text subhead>
                { item.nextStep }
                </Text>
            </View>
            <View style = {{ marginTop : 5 , flexDirection : 'row' , alignItems:'center'}}>
                <Text callout light  
                style = {{ 
                    //textDecorationLine : 'underline'
                }}>
                {'Taux Realisation '} 
                </Text>
               {/*  <Icon name = 'arrow-right-thin' size = { 24 } color = { colors.primary} /> */}
                <View style = {{ marginLeft : 'auto', paddingVertical : 5, paddingHorizontal : 15 , backgroundColor : item.isUp ? colors.primary : colors.card , borderRadius : 30}}>
                    <Text bold subhead >
                    { item.executionRate + '%'}
                    </Text>
                </View>
                    
            </View>
            <View style = {{ marginTop : 5 , flexDirection : 'row' , alignItems:'center'}}>
                <Text callout light  style = {{ 
                    //textDecorationLine : 'underline'
                }}>
                {'Taux  Reception '} 
                </Text>
                {/* <Icon name = 'arrow-right-thin' size = { 24 } color = { colors.primary} /> */}
                <View style = {{ marginLeft : 'auto', paddingVertical : 5, paddingHorizontal : 15 , backgroundColor : item.isUp ? colors.primary : colors.card , borderRadius : 30}}>
                    <Text bold subhead>
                    { item.acceptanceRate + '%'}
                    </Text>
                </View>
            </View>
            <View style = {{ marginTop : 5 , flexDirection : 'row' , alignItems:'center'}}>
                <Text callout light  style = {{ 
                    //textDecorationLine : 'underline'
                }}>
                {'Taux  Immobilisation '} 
                </Text>
                {/* <Icon name = 'arrow-right-thin' size = { 24 } color = { colors.primary} /> */}
                <View style = {{ marginLeft : 'auto', paddingVertical : 5, paddingHorizontal : 15 , backgroundColor : item.isUp ? colors.primary : colors.card , borderRadius : 30}}>
                    <Text bold subhead>
                    { item.savingRate + '%'}
                    </Text>
                </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
              paddingTop: 10,
              paddingBottom: 10,
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
              <LabelUpper2Row style={{ flex: 1 }} label={'Numero DA'} value={'DA'+item.daNumber}/>
              <LabelUpper2Row style={{ flex: 1 }} label={'Ligne de compte'} value={item.projectID} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={'Type Prestation'} value={item.prestationType} />
              <LabelUpper2Row style={{ flex: 1 }} label={'Montant TTC'} value={'XOF'+item.amountTTC} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={'Jalon'} value={item.jalon + ' (' + item.days+ ' Jours )'} />
              <LabelUpper2Row style={{ flex: 1 }} label={'Statut'} value={item.status.status} />
            </View>
          </View>
          <Text title3>{'Annexes'}</Text>
          <ListMenuIcon style={{ paddingTop: 20 }} icon={'add-business'} iconColor = {colors.primary}  name={item.providedBy.name} />
          <ListMenuIcon style={{ paddingVertical: 10 }} icon={'history'} iconColor = {colors.primary} name={'Voir historique des realisations'} />
          <ListMenuIcon style={{ paddingVertical: 10 }} icon={'upload-file'} iconColor = {colors.primary} name={'Voir document projets'} />
        </ScrollView>
      </View>
      <View style = {{ flexDirection : 'row' ,  marginVertical: 20 }}>
        <Button
            style={{ flex : 1, marginLeft : 20, marginRight: 5 ,  }}
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
            onPress={navigateToBcEdit}
            loading={modifyLoading}
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

    </View>
  );
};

export default BcDetailsScreen