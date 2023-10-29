import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import colors from '../../theme/colors'
import Text from '../Text'
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const OptionSelected = ({ style = {}, textLeft = '', textRight = '', onPress = () => {} , primary=false }) => {
  
  return (
    <TouchableOpacity style={[styles.container, { borderBottomColor: colors.border }, style]} onPress={onPress}>
      <Text body1 primary={primary} >{textLeft}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Text numberOfLines={1} body1 light style={{ marginRight: 5 }}>
          {textRight}
        </Text>
        <Icon name="chevron-right" color={colors.primary}  size = {20}/>
      </View>
    </TouchableOpacity>
  )
}

OptionSelected.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
  onPress: PropTypes.func,
  primary: PropTypes.bool
}
export default OptionSelected
