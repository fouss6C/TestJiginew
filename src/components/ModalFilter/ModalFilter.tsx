import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal';
import colors from '../../theme/colors'
import Text from '../Text'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles';
import PropTypes from 'prop-types'

const ModalFilter = (props) => {
  const { onClose, title, value, onChange, options, ...attrs } = props
  const [itemSelected, setItemSelected] = useState({})
  const cardColor = colors.card

  const onSelectFilter = (item) => setItemSelected(item)

  useEffect(() => {
    if (value.key !== itemSelected.key) {
      setItemSelected(value);
    }
  }, [value])

  const onHandleClose = () => {
    onClose()
    setItemSelected(value)
  }

  return (
    <Modal propagateSwipe swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={styles.contentSwipeDown}>
        <View style={styles.lineSwipeDown} />
      </View>
      <View style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignContent: 'center',
            justifyContent: 'center',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
          }}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={onHandleClose}>
            <Text subhead accent >Annuler</Text>
          </TouchableOpacity>
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text subhead bold>{title}</Text>
          </View>
          <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={() => onChange(itemSelected)}>
            <Text subhead primary>
              Accepter
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ padding: 10, flex: 1 }}>
            {options.map((item) => {
              const isChecked = itemSelected.key === item.key;
              return (
                <TouchableOpacity
                  style={[
                    {
                      flexDirection: 'row',
                      backgroundColor: isChecked ? colors.primary : 'transparent',
                      padding: 10,
                      borderRadius: 5,
                    },
                  ]}
                  key={item.key}
                  onPress={() => onSelectFilter(item)}
                >
                  <Text style={{ flex: 1 }} subhead white ={isChecked}>
                    {item.name}
                  </Text>
                  {isChecked && <Icon name="check" color={colors.primary} />}
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}
ModalFilter.propType = {
    onClose: PropTypes.func,
    title: PropTypes.string, 
    value:PropTypes.object,
    onChange:PropTypes.func,
    options : PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default ModalFilter
