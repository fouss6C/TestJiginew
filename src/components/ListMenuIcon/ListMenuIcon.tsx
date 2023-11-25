import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import colors from '../../theme/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Text from '../Text'
import styles from './styles'

export default function ListMenuIcon(props) {
  const { style, onPress, title, icon , iconColor  } = props

  return (
    <TouchableOpacity style={[styles.contain, { borderColor: colors.border }, style]} onPress={onPress}>
      <Icon name={icon} size={24} solid color={iconColor?iconColor : colors.primary} />
      <Text body1  style={{ flex: 1, paddingLeft: 10 }}>
        {title}
      </Text>
      <Icon name="chevron-right" size={24} solid color={iconColor?iconColor : colors.primary} />
    </TouchableOpacity>
  );
}

ListMenuIcon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string,
  iconColor : PropTypes.string,
}

ListMenuIcon.defaultProps = {
  style: {},
  onPress: () => {},
  icon: '',
  iconColor: 'primary',
  title: '',
}