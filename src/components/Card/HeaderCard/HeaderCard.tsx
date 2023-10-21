import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'
import {font , colors, BaseStyle, Typography} from '../../../theme'
import Text from '../../Text'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function HeaderCard({ title = '', badge='' , value = '', isCenter = false, isPrimary = false, style = {}, onPress = () => {}, disabled = false }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.headerCard,
        { backgroundColor: colors.card },
        isPrimary && styles.headerCardPrimary,
        isPrimary && { backgroundColor: colors.card },
        isCenter && styles.headerCardCenter,
        style,
      ])}
      onPress={()=>{}}
    >
      
      <Text body1 light={!isPrimary} primary ={isPrimary}>
        { title }
      </Text>
      
      <Text title2 black ={!isPrimary} style={{ marginVertical: 5 }}>
        { value }
      </Text>
      <Text footnote light style = {{ position : 'absolute' , right : 5, bottom : 5}}> {badge} </Text>
    </TouchableOpacity>
  );
}
HeaderCard.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    isCenter : PropTypes.bool,
    isPrimary : PropTypes.bool ,
    disabled : PropTypes.bool,
    value : PropTypes.string,
    badge : PropTypes.string,
}

export default HeaderCard
