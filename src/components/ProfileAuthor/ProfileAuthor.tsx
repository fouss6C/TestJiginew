import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View , Image} from 'react-native'
import Text from '../Text'
import styles from './styles'
//import Loading from './Loading'
const defaultImage = '../../assets/image/default-avatar.jpg'

export default function ProfileAuthor(props) {
  const {
    style,
    image,
    styleLeft,
    styleThumb,
    styleRight,
    onPress,
    name,
    description,
    textRight,
    styleName,
    styleDescription,
    loading,
  } = props;

  /* if (loading) {
    return <Loading style={style} styleLeft styleThumb styleRight />;
  } */


  return (
    <TouchableOpacity style={[styles.contain, style]} activeOpacity={0.9}>
      <View style={[styles.contentLeft, styleLeft]}>
        <Image source={require(defaultImage) } style={[styles.thumb, styleThumb]} />
        <View>
          <Text headline semibold numberOfLines={1} style={styleName}>
            {name}
          </Text>
          <Text footnote gray numberOfLines={1} style={styleDescription}>
            {description}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}  style={[styles.contentRight, styleRight]}>
        <Text body2 style={styleRight} numberOfLines={1}>
          {textRight}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

ProfileAuthor.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  textRight: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
}

ProfileAuthor.defaultProps = {
  image: defaultImage,
  name: '',
  description: '',
  textRight: '',
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  style: {},
  onPress: () => {},
}