import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import colors from '../../theme/colors'
import Text from '../Text'
import styles from './styles'

const SearchResultLabel = ({
  style = {},
  title = '',
  textLeft = '',
  textRight = '',
  onPress = () => {},
  disabled = false,
  styleRight = {},
  styleLeft = {}
}) => {
  
  return (
    <TouchableOpacity style={[styles.container, { borderBottomColor: colors.border }, style]} onPress={onPress}>
      <Text subhead primary >
        {title}
      </Text>
      <View disabled = {disabled} style = {styles.content}>
        <Text style = {styleLeft} body2>{textLeft}</Text>
        <Text style = {styleRight} body2>{textRight}</Text>
      </View>
    </TouchableOpacity>
  )
}

SearchResultLabel.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight : PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft : PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
  onPress: PropTypes.func,
}

export default SearchResultLabel
