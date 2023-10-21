import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import {font , colors, BaseStyle, Typography} from '../../theme'
import Text from '../Text'
import styles from './styles';

export default function Button(props) {
  //const { colors } = useTheme();
  const { onPress, style, styleText, icon, outline, full, round, loading, children, disabled, ...rest } = props;
  return (
    <TouchableOpacity
      {...rest}
      style={StyleSheet.flatten([
        [styles.default, { backgroundColor: colors.primary }],
        outline && [
          styles.outline,
          {
            backgroundColor: colors.white,
            borderColor: colors.primary,
          },
        ],
        full && styles.full,
        round && styles.round,
        disabled && { backgroundColor: colors.card, borderColor: colors.card },
        style,
      ])}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {icon ? icon : null}
      <Text
        style={StyleSheet.flatten([
          styles.textDefault,
          outline && { color: colors.primary },
          disabled && { color: colors.black },
          styleText,
        ])}
        numberOfLines={1}
      >
        {children}
      </Text>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? colors.primary : colors.white}
          style={{ paddingLeft: 5 }}
        />
      ) : null}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress : PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  outline: PropTypes.bool,
  full: PropTypes.bool,
  round: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node,
}

Button.defaultProps = {
  onPress : ()=> {},
  style: {},
  icon: null,
  outline: false,
  full: false,
  round: false,
  loading: false,
}