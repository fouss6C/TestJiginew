import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import colors  from '../../theme/colors'
import Text from '../Text'
import styles from './styles'

const Transaction = ({
  style = {},
  backgroundIcon = colors.primary,
  initial  = 'NP',
  name = '',
  date = '',
  status = '',
  price = '',
  isUp = true,
  onPress = () => {},
  icon = '',
  reference = '1148975',
  actID = ''
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.image, { backgroundColor: backgroundIcon }]}>
        {/* <Icon name={icon} size={20} color={colors.white} solid /> */}
        <Text white headline> {initial}</Text>
      </View>
      <View style={{ paddingLeft: 1, flex: 1 }}>
        <Text body2 semibold>{name}</Text>
        <View style = {{ flexDirection:'row',  top:5 }}>
          <Text footnote light
            style={{ fontFamily : 'Roboto' }}
          >
          {' '+ reference + ' '}
          </Text>
          <Text overline light>
          {date}
          </Text>
        </View>
      </View>
      <View>
        <Text  footnote bold style= {[styles.text ]}>
          { price }
        </Text>
        <Text overline green = {isUp} red = {!isUp} style={[styles.text, {marginTop: 5}]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

Transaction.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  onPress: PropTypes.func,
  isUp: PropTypes.bool,
  backgroundIcon: PropTypes.string,
  initial : PropTypes.string,
  reference : PropTypes.string,
  actID : PropTypes.string,
}

export default Transaction
