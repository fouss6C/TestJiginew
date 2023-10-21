import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, TouchableOpacity, View } from 'react-native';
//import { parseHexTransparency } from '@/utils';
import {font , colors, BaseStyle, Typography} from '../../../theme'
import Icon from '../../Icon'
import Text from '../../Text'
import styles from './styles'

const Card03 = ({
  title = '',
  subTitle = '',
  price = '',
  icon = '',
  percent = '',
  style = {},
  onPress = () => {},
  isUp = true,
  colorIcon = '',
  backgroundIcon = '',
  disabled = false,
}) => {

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
                backgroundColor: backgroundIcon ? backgroundIcon : colors.white,
                borderColor : colors.gray,
                borderWidth : 0.5,
              },
            ]}
          >
          <Icon
              name={icon}
              size={22}
              style={{
                color: colorIcon ? colorIcon : colors.primary,
              }}
              solid
            />
          </View>
          <Text body1 style={{ marginLeft: 5 }}>
            {title}
          </Text>
        </View>
        <Text footnote light style={{ marginTop: 20 }}>
          {subTitle}
        </Text>
        <View style={styles.viewBottom}>
          <Text headline>{price}</Text>
          <Text footnote green ={isUp} primary ={!isUp} >
            <Icon name={isUp ? 'menu-up' : 'menu-down'} size = {24} color={isUp ? colors.green : colors.primary} />{' '}
            {percent}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Card03.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
  subTitle: PropTypes.string,
  percent: PropTypes.string,
}

export default Card03
