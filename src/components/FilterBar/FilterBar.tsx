import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import colors  from '../../theme/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from '../Text'
import styles from './styles'

const FilterBar = ({
  style = {},
  onPress = () => {},
  leftTitle = '',
  centerTitle = '',
  rightTitle = '',
  value = {
    leftValue: false,
    centerValue: false,
    rightValue: true,
  },
  onChange = () => {},
  centerSet = false
}) => {

  const renderView = (title = '', key = 'leftValue', location='center') => (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: location,
      }}
      onPress={() => {
        onChange({ ...value, [key]: !value?.[key] })
      }}
    >
      <Text body2 semibold style={styles.text}>
        {title}
        {'  '}
        <Icon name={value?.[key] ? 'chevron-up' : 'chevron-down'} size = { 18 } color = {colors.primary} />
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }, style]} onPress={onPress}>
      {renderView(leftTitle, 'leftValue', 'flex-start')}
      {centerSet && renderView(centerTitle, 'centerValue', 'center')}
      {renderView(rightTitle, 'rightValue', 'flex-end')}
    </View>
  )
}

FilterBar.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  leftTitle: PropTypes.string,
  centerTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  centerSet: PropTypes.bool,
}

export default FilterBar
