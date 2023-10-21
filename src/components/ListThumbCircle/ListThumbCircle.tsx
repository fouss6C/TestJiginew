import React from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, View , Image} from 'react-native'
import Text from '../Text'
import styles from './styles'
import colors from '../../theme/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ListThumbCircle(props) {
  
  const { style, imageStyle, image, txtLeftTitle, txtContent, txtRight, onPress } = props;
  return (
    <TouchableOpacity
      style={[styles.contain, { borderBottomWidth: 1, borderBottomColor: colors.border }, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
        <View style={[styles.thumb, imageStyle]} >
            <Icon name='history' size = {26} color={colors.onPrimary} />
        </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.content}>
          <View style={styles.left}>
            <Text headline semibold numberOfLines={1}>
              {txtLeftTitle}
            </Text>
          </View>
          <View style={styles.right}>
            <Text caption2 gray numberOfLines={1}>
              {txtRight}
            </Text>
          </View>
        </View>
        <Text note numberOfLines={1} footnote gray style={{ paddingTop: 5 }}>
          {txtContent}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

ListThumbCircle.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageStyle: PropTypes.object,
  image: PropTypes.node.isRequired,
  txtLeftTitle: PropTypes.string,
  txtContent: PropTypes.string,
  txtRight: PropTypes.string,
  onPress: PropTypes.func,
}

ListThumbCircle.defaultProps = {
  style: {},
  imageStyle: {},
  image: '',
  txtLeftTitle: '',
  txtContent: '',
  txtRight: '',
  onPress: () => {},
}
