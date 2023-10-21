import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from '../Text'
import styles from './styles'
import colors from '../../theme/colors'

export default function FilterOption({
  title = 'Title',
  name = '',
  iconName = 'credit-card',
  checked = true,
  onPress = () => {},
  style = {},
  isIcon = false,
}) {

  return (
    <TouchableHighlight
      // activeOpacity={0.6}
      underlayColor={colors.card}
      onPress={onPress}
    >
      <View style={[styles.container, style]}>
        <Icon
          name={checked ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
          size={24}
          solid={checked}
          style={{ padding: 8 }}
          color={colors.primary}
        />

        {isIcon && (
          <View style={{ width: 42, alignItems: 'center' }}>
            <Icon name={iconName} size={24} solid style={{ padding: 8 }} />
          </View>
        )}
        <Text body1 >{title }</Text>
        <Text body1 bold  style={{fontFamily : 'Roboto'}} > {''} {name}</Text>
      </View>
    </TouchableHighlight>
  )
}