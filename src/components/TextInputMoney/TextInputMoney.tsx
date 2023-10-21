import React, { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import colors from '../../theme/colors'
import {Typography} from '../../theme/typography'
import TextInput from '../TextInput'
import styles from './styles'

const formatter = (number = 0) => {
  try {
    return Number(parseFloat(number).toFixed(2)).toLocaleString();
  } catch (error) {
    return '0';
  }
}

const TextInputMoney = ({ 
    value = 0, 
    onChange = () => {} , 
    styleContainer = {},
    styleText = {} , 
    inputStyle={},
    textAlign = '',
    placeholder='XOF0'
}) => {

  return (
    <View style={StyleSheet.flatten([
        { backgroundColor: colors.card }, 
        styleContainer ])}
    >
      <TextInput
        //style = { style }
        style = { StyleSheet.flatten([
            styles.default,
            styleText,
          ])}
        keyboardType="numeric"
        inputStyle = {inputStyle}
        onChangeText={(text) => {
          const number = text.replace(/[^0-9.-]+/g, '');
          //const number = Number(parseFloat(text));
          onChange(number)
        }}
        textAlign={textAlign}
        autoCorrect={false}
        placeholder = {placeholder}
        placeholderTextColor={colors.gray}
        value={`${'XOF'}${value ? formatter(value) : ''}`}
        selectionColor={colors.primary}
        numberOfLines={1}
      />
    </View>
  )
}

export default TextInputMoney