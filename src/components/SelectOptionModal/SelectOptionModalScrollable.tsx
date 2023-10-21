import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal';
import colors from '../../theme/colors'
import Text from '../Text'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'

const SelectOptionModalScroll = (props) => {
  const { optionChoosed, options, onChange, ...attrs } = props

  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={[styles.contentFilterBottom, { backgroundColor: colors.card }]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{ padding: 10, flex: 1 }}>
        {options.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.contentActionModalBottom,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: index === options.length - 1 ? 0 : StyleSheet.hairlineWidth,
              },
            ]}
            key={index}
            onPress={() => onChange(item)}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.iconName && (
                <Icon solid name={item.iconName} color={item.iconColor} style={styles.image} size={18} />
              )}
              <Text body2 regular primary ={item.checked}>
                {item.text} <Text subhead ultraLight>{item?.description}</Text> 
              </Text>
            </View>
            {optionChoosed.id === item.id && <Icon name="check" size={14} color={colors.primary} />}
          </TouchableOpacity>
        ))}
        </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

SelectOptionModalScroll.defaultProps = {
  optionChoosed: {},
  options: [],
  onPress: () => {},
  onChange: () => {},
};

SelectOptionModalScroll.propTypes = {
  optionChoosed: PropTypes.object,
  options: PropTypes.array,
  onPress: PropTypes.func,
};

export default SelectOptionModalScroll