import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text'
import styles from './styles';

const TitleList = ({ title = '', textMore = '', onPress = () => {} }) => {
  return (
    <View style={styles.titleList}>
      <Text title3>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text body2 accent>
          {textMore}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TitleList
