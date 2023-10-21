import React from "react"
import { View, Text, TextInput, StyleSheet, I18nManager } from "react-native"
import colors from '../../../theme/colors'
import font from '../../../theme/font'
import { Control, Controller, Path } from "react-hook-form"

interface ICustomInput<ContentType> {
  control: Control<ContentType, object>,
  name: Path<ContentType>,
  rules?: {},
  placeholder?: string,
  secureTextEntry?: boolean
}

function CustomInput<ContentType>({
  control,
  name,
  rules = {},
  placeholder = "",
  secureTextEntry = false,
}: ICustomInput<ContentType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.inputContainer,
              { borderColor: error ? "red" : colors.grey },
            ]}
          >
            <TextInput
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
            
          </View>
          {error && (
            <Text style={styles.error}>
              {error.message || "Error"}
            </Text>
          )}
          
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 35,
    borderWidth: 1,
    //borderColor: colors.secondary,
    backgroundColor: colors.white,
    //paddingLeft: 20,
    width: '80%',
    alignSelf: 'center',
    justifyContent : 'center',
    marginTop: 15,
    marginBottom: 2 ,
    borderRadius: 25,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  error : {
    alignSelf: 'flex-start',
    paddingLeft: 50,
    color: "red",  
  },
  input: {
    color : colors.black,
    fontWeight : font.weight.regular,
    height: 40,
    margin: 12,
  },
  
})

export default CustomInput
