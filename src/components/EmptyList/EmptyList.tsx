import { View} from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Text from '../Text'

const EmptyList = ({item}) => {
  return (
    <View style = {{ flex : 1 , alignItems: 'center' , justifyContent: 'center'}}>
        <Icon name = 'search' size = { 32 } color = { colors.primary } />
        <Text body1 style = {{ marginTop : 5}} > Aucun Resultat trouvé pour ( {item} )</Text>
        <Text footnote gray > Verifier l'ortographe, ou Lancez une nouvelle recherche..</Text>
    </View>
  )
}

export default EmptyList