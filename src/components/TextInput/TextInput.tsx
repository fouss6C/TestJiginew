import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { I18nManager, TextInput, View } from 'react-native'
import colors from '../../theme/colors'
import font from '../../theme/font'
import {BaseStyle} from '../../theme/baseStyle'

const TextInputs = forwardRef((props, ref) => {
 
  const {
    style,
    onChangeText,
    onFocus,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    iconLeft,
    onSubmitEditing,
    inputStyle,
    ...attrs
  } = props

  return (
    <View style={[BaseStyle.textInput, { backgroundColor: colors.card }, style]}>
      {iconLeft}
      <TextInput
        ref={ref}
        style={[
          {
            fontFamily: `Raleway-Regular`,
            flex: 1,
            height: '100%',
            textAlign: I18nManager.isRTL ? 'right' : 'auto',
            color: colors.black,
            paddingTop: 5,
            paddingBottom: 5,
          },
          inputStyle,
        ]}
        onChangeText={(text) => onChangeText(text)}
        onFocus={() => onFocus()}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={success ? colors.gray : colors.primary}
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={colors.primary}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        {...attrs}
      />
      {icon}
    </View>
  )
})

TextInputs.propTypes = {
  style : PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  iconLeft: PropTypes.node,
  onSubmitEditing: PropTypes.func,
  inputStyle: PropTypes.object,
};

TextInputs.defaultProps = {
  inputStyle: {},
  style: {},
  onChangeText: () => {},
  onFocus: () => {},
  placeholder: 'Placeholder',
  value: '',
  success: true,
  secureTextEntry: false,
  keyboardType: 'default',
  multiline: false,
  textAlignVertical: 'center',
  icon: null,
  iconLeft: null,
  onSubmitEditing: () => {},
}

export default TextInputs 
