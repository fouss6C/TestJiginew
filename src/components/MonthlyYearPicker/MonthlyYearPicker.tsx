import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Text from '../Text';
import styles from './styles'
import colors from '../../theme/colors'

export default function MonthYearPicker(props) {
  
  const [modalVisible, setModalVisible] = useState(false)
 
  const { style, onChange, date = new Date() } = props;
  const [ monthPicked , setMonthPicked ] = useState(moment(date).format('MM'));
  const [yearPicked , setYearPicked] = useState(moment(date).format('YYYY'))
 
  const openModal = () => {
    setModalVisible(true);
  }

  const handleDatePicked = (dateInline) => {
    setMonthPicked(moment(dateInline).format('MM'))
    setYearPicked(moment(dateInline).format('YYYY'))
    onChange(dateInline)
    setModalVisible(false)
  }

  const hideDateTimePicker = () => {
    setModalVisible(false);
  }

  return (
    <View style={[styles.contentPickDate, { backgroundColor: colors.card }, style]}>
      <DateTimePicker
        mode="date"
        date={date}
        isVisible={modalVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
      <TouchableOpacity style={styles.itemPick} onPress={() => openModal()}>
        <Text caption1 light style={{ marginBottom: 5 }}>
          {'Mois'}
        </Text>
        <Text headline semibold>
          {monthPicked}
        </Text>
      </TouchableOpacity>
      <View style={[styles.linePick, { backgroundColor: colors.border }]} />
      <TouchableOpacity style={styles.itemPick} onPress={() => openModal()}>
        <Text caption1 light style={{ marginBottom: 5 }}>
          {'Année'}
        </Text>
        <Text headline semibold>
          {yearPicked}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

MonthYearPicker.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
};

MonthYearPicker.defaultProps = {
  style: {},
  onChange: () => {},
}