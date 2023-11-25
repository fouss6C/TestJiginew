import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import LabelUpper2Row from '../../components/LabelUpper2Row'
import ListMenuIcon from '../../components/ListMenuIcon'
import Text  from '../../components/Text'
import colors from '../../theme/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import Button from '../../components/Button'
import SelectOptionModal from '../../components/SelectOptionModal'
import projectStatus from '../../assets/data/ProjectLineStatus'

const AccountDetailsScreen = () => {

    const insets = useSafeAreaInsets()
    const [closeLoading, setCloseLoading] = useState(false)
    const [modifyLoading, setModifyLoading] = useState(false)
    const navigation = useNavigation()
    const route = useRoute()
    const [item, setItem] = useState(route?.params?.item)
    const [statusSelected , setStatusSelected] = useState('')
    const [statusModalVisible , setStatusModalVisible] = useState(false)

    useEffect(() => {
        if (route?.params?.item) {
          // get the DA information from API , by ID 
          //setItem(route?.params?.item)
          navigation.setOptions({headerTitle :'Projet '+ route?.params?.item.projectNumber })
        }
    }, [route?.params?.item])

    const onProjectStatusSelect = (option) => {
        setStatusSelected(option);
        setStatusModalVisible(false);
        // render an Alert Message with the new Status for validation 
        Alert.alert('fermeture ou ouverture de compte', 'Merci de bien vouloir confirmer ?', 
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
                <Text title2 style ={{ fontFamily : 'Roboto'}}>{item.projectNumber } 
                    <Text subhead gray> { '#'+item.group.name }
                    </Text>
                </Text>
              <Text title3 style={{ marginTop: 20 }}>
                {item.name}
              </Text>
            </View>
            <TouchableOpacity  style={{ alignItems: 'center', justifyContent:'center' , borderRadius : 20 , backgroundColor: item.isUp? colors.green : colors.primary,  width: 40, height: 40 }} >
                <Text headline1 white style={{ transform: [{ rotate: "315deg" }] }} > {item.group.tag} </Text>
            </TouchableOpacity>
          </View>
          <Text body2>
            {item.motive}
          </Text>
          <Text subhead gray style={{ marginTop: 15 , marginLeft : 'auto' }} >
            crée le {item.createdAt || '20-11-2023'}
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
                <LabelUpper2Row style={{ flex: 1 }} label={'Solde'} value={''+item.balance}/>
                <LabelUpper2Row style={{ flex: 1 }} label={'Compte système'} value={''+item.acctID} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
                <LabelUpper2Row style={{ flex: 1 }} label={'Type'} value={''+item.type || 'Capex'} />
                <LabelUpper2Row style={{ flex: 1 }} label={'Statut'} value={''+item.status.status} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
                <LabelUpper2Row style={{ flex: 1 }} label={'Montant HT'} value={''+item.amountHT} />
                <LabelUpper2Row style={{ flex: 1 }} label={'Montant TTC'} value={''+item.amountTTC} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
                <LabelUpper2Row style={{ flex: 1 }} label={'Numero BC'} value={'BC'+item.bcID.bcNumber} />
                <LabelUpper2Row style={{ flex: 1 }} label={'Numero DA'} value={'DA'+item.daID.daNumber} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
                <LabelUpper2Row style={{ flex: 1 }} label={'Transfer IN'} value={''+item.transferts[0]?.type} />
                <LabelUpper2Row style={{ flex: 1 }} label={'Transfer OUT'} value={''+item.transferOut} />
            </View>
          </View>
          <Text title3>{'Annexes'}</Text>
          <ListMenuIcon style={{ paddingVertical: 10 }} icon={'history'} iconColor = {colors.primary} title = {'Voir historique des transactions'} />
        </ScrollView>
      </View>
      <View style = {{ flexDirection : 'row', marginVertical: 20 }}>
        <Button
            style={{ flex : 1, marginLeft : 20, marginRight: 5 , }}
            onPress={() => {
                setCloseLoading(true);
                setTimeout(() => {
                setCloseLoading(false)
                setStatusModalVisible(true)
                }, 10)
            }}
            loading={closeLoading}
            outline
            >
            {'Clôturer'}
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
            options={projectStatus}
            onChange = {onProjectStatusSelect}
            onSwipeComplete={() => setStatusModalVisible(false)}
        />
        </View>

    </View>
  );
};

export default AccountDetailsScreen