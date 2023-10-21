import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import ENotificationData from '../../assets/data/Notifications'
import ListThumbCircle from '../../components/ListThumbCircle'
import colors from '../../theme/colors'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

const HistoricalScreen = ({ navigation }) => {

    const [products] = useState(ENotificationData);
    const [refreshing] = useState(false)
    const insets = useSafeAreaInsets()
    const route = useRoute()
    const [item , setItem] = useState()

    useEffect(() => {
        if (route?.params?.item) {
          // get the DA information from API , by ID 
          setItem(route?.params?.item)
          navigation.setOptions({headerTitle :'Historique DA '+ route?.params?.item.daNumber })
        }
    }, [route?.params?.item])

    return (
        <View 
            style={{ 
            flex: 1, 
            backgroundColor: colors.white,
            justifyContent: 'space-between',
            alignItems: 'center',
            // Paddings to handle safe area
            //paddingTop: insets.top,
            //paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>

        <View style={ [ styles.container]}>
          <FlatList
            contentContainerStyle={{ 
                paddingTop: 10 
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
            data={products}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListThumbCircle
                style={{ marginBottom: 5 }}
                //image={item.image}
                txtLeftTitle={item.type}
                txtContent={'Operation de '+ item.user + ' sur ' + item.item}
                txtRight={item.date}
                onPress={() => {}}
              />
            )}
          />
        </View>
      </View>
    )
}

export default HistoricalScreen
