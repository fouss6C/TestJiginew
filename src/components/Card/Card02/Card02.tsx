import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import {font , colors, BaseStyle, Typography} from '../../../theme'
import Icon from '../../Icon'
import Text from '../../Text'
import styles from './styles'

const Card02 = ({ title = '', price = '', icon = '', style = {}, onPress = () => {}, disabled = false }) => {

  return (
    <TouchableOpacity disabled={disabled} style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.white,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={[styles.header]}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Icon name={icon} size={12} style={{ color: colors.onPrimary }} solid />
          </View>
        </View>

        <Text subhead light style={{ marginTop: 5 }}>
          {title}
        </Text>
        <Text headline style={{ marginTop: 5 }}>
          {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Card02.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
};

export default Card02
