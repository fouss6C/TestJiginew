import React, { useContext, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
// Load sample data
import UserData from '../../assets/data/Profile'
import Button from '../../components/Button' 
import ProfileDetail from '../../components/ProfileDetails'
import ProfileStatistics from '../../components/ProfileStatistics'
import Tag from '../../components/Tag'
import Text from '../../components/Text'
import styles from './styles'
import colors from '../../theme/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { AuthContext } from '../Context/AuthContextProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = (props) => {

  const insets = useSafeAreaInsets()
  const [Loading, setLoading] = useState(false)
  const [userData] = useState(UserData[0])
  const { userToken , setUserToken } = useContext(AuthContext)

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  }

  const signOutSubmit = async () => {
    setUserToken ( null )
    AsyncStorage.removeItem('userToken')
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
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <ProfileDetail
               // image={userData.image}
                textFirst={userToken?.auth_user.firstName + ' '  + userToken?.auth_user.lastName}
                point={'N+'+ userToken?.auth_user.groupID.hierarchy}
                textSecond={userToken?.auth_user.email}
                textThird={userToken?.auth_user.matricule}
                onPress={() => {}}
              />
              <View style={styles.viewFollow}>
                <View style={{ flex: 3 }}>
                  <Tag outline style={styles.follow}>
                    {userToken?.auth_user.groupID.name}
                  </Tag>
                </View>

                <View style={{ flex: 5 }}>
                  <ProfileStatistics data={userData.performance} />
                </View>
              </View>
            <View style={{ width: '100%' , marginTop : 15 }}>
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    //navigation.navigate('ProfileEdit');
                  }}
                >
                  <Text body1>{'Modifier mon profil'}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                   // navigation.navigate('ChangePassword');
                  }}
                >
                  <Text body1>{'Changer mon mot de passe'}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    //navigation.navigate('EWishlist');
                  }}
                >
                  <Text body1>{'Voir mes réalisations'}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                   // navigation.navigate('ChangePassword');
                  }}
                >
                  <Text body1>{'Paramètres de comptes'}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    //navigation.navigate('ContactUs');
                  }}
                >
                  <Text body1>{'Contacter l\'administrateur'}</Text>
                  <Icon name="angle-right" size={18} color={colors.primary} style={{ marginLeft: 5 }} enableRTL={true} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    //navigation.navigate('AboutUs');
                  }}
                >
                  <Text body1>{'A propos de Jiginew'}</Text>
                  <Icon name="angle-right" size={18} color={colors.primary} style={{ marginLeft: 5 }} enableRTL={true} />
                </TouchableOpacity>
            </View>
            <Button  
              style={{ marginHorizontal: 20, marginTop:30 }} 
              loading={Loading} 
              round
              onPress={signOutSubmit}
            >
            {'Me Deconnecter'}
            </Button>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}
export default ProfileScreen