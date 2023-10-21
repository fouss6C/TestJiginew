import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../../theme/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from '../Text'
import ModalFilter from '../ModalFilter'

const PickerSelect = ({ label = '', options = [], value = {}, onChange = () => {} }) => {
  
  const [modalVisible, setModalVisible] = useState(false);

  const onSave = (itemSelected) => {
    onChange(itemSelected)
    setModalVisible(false)
  }

  const onClose = () => setModalVisible(false);

  return (
    <View>
      {/* <Text numberOfLines={1} footnote bold>
        {label}
      </Text> */}
      <TouchableOpacity
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: 25,
          borderColor: colors.border,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text subhead style={{ flex: 1 }} numberOfLines={1}>
          {value?.name}
        </Text>
        <Icon name="chevron-down" color={colors.primary} size={20} />
      </TouchableOpacity>

      <ModalFilter
        title={label}
        options={options}
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        value={value}
        onClose={onClose}
        onChange={onSave}
      />
    </View>
  );
};

export default PickerSelect;
