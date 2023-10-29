import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Image from '../Image'
import Text from '../Text'
import styles from './styles'
import colors from '../../theme/colors'
const logo = "../../assets/image/logo-hand.png"


export default function ProfileDetail(props) {
  //const defaultAvatar = "../../assets/image/profile-4.jpg"
  
  const { style, image, styleLeft, styleThumb, styleRight, onPress, textFirst, point, textSecond, textThird, icon } =
    props;
  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.contentLeft, styleLeft]}>
        <View>
          <Image source = {require (logo)} style={[styles.thumb, styleThumb]} />
          <View style={[styles.point, { backgroundColor: colors.secondary }]}>
            <Text overline white semibold>
              {point}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <Text headline semibold numberOfLines={1}>
            {textFirst}
          </Text>
          <Text
            body2
            style={{
              marginTop: 3,
              paddingRight: 10,
            }}
            numberOfLines={1}
          >
            {textSecond}
          </Text>
          <Text footnote gray numberOfLines={1}>
            {textThird}
          </Text>
        </View>
      </View>
      {icon && (
        <View style={[styles.contentRight, styleRight]}>
          <Icon name="angle-right" size={18} color={colors.primary} enableRTL={true} />
        </View>
      )}
    </TouchableOpacity>
  )
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func,
}

ProfileDetail.defaultProps = {
  image: '',
  textFirst: '',
  textSecond: '',
  icon: true,
  point: '',
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {},
}