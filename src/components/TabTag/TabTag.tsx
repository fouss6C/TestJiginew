import React from 'react';
import { View } from 'react-native';
import colors from '../../theme/colors'
import Tag from '../Tag'
import styles from './styles'

const TabTag = ({ tabs = [], tab = {}, onChange = () => {}, style = {} }) => {
  
  return (
    <View style={[styles.tabBar, style]}>
      {tabs.map((item, index) => (
        <Tag
          key={index}
          primary
          style={{
            marginHorizontal: 3,
            flex: 1,
            backgroundColor: tab.id === item.id ? colors.primary : 'transparent',
            borderWidth: 1,
            borderColor : colors.border
          }}
          textStyle={{
            color: tab.id === item.id ? colors.white : colors.black,
            fontWeight : '500'
          }}
          onPress={() => onChange(item)}
        >
          {item.title}
        </Tag>
      ))}
    </View>
  )
}
export default TabTag
