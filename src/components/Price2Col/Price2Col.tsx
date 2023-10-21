import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View , Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from '../Text'
import styles from './styles'
import colors from '../../theme/colors'

const currentBal2Col = ({
  style = {},
  image = '',
  tagAct = '',
  code = '',
  name = '',
  usedBal = '',
  initialBal = '',
  percent = '',
  currentBal = '',
  statusAct = '',
  onPress = () => {},
  isUp = false,
}) => {

  const [statusActWatch] = useState(statusAct)

  const statusIcon = () => {
    if(statusActWatch == 'idle') {
      return 'lock-outline'
    }else if((statusActWatch == 'open') && isUp) {
      return 'lock-open-plus-outline'
    } else if( (statusActWatch == 'open') && !isUp ) {
      return 'lock-open-minus-outline'
    }else {
      return 'lock-check-outline'
    }
  }
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {/* <Image source = {require ("../../assets/image/logo-hand.png") } style={styles.imageStyle} /> */}
      <View style={styles.tagStyle} >
        <Text footnote black  > {tagAct} </Text>
      </View>
      <View style={{ paddingLeft: 8, flex: 1 }}>
        <Text headline1 style={{fontFamily: 'Poppins-Regular'}}>
          {code}
          <Text caption1 light style={{fontFamily: 'Poppins-Regular'}}>
            {' '}
            {name}
          </Text>
        </Text>
          {/* {usedBal} */}
          <View style = {{ flexDirection:'row' , paddingTop:5 }}>
            <Icon name = {statusIcon()} size = { 14 } color= {colors.black} />
            <Text body2 regular style = {{ color : colors.secondary}} >
                {' '}
                {initialBal}
            </Text>
          </View>
      </View>
      <View style={{  }}>
        <Text headline1 style={styles.text}>
          {currentBal}
        </Text>
        <Text footnote green ={isUp} primary ={!isUp} style={styles.text}>
          <Icon name={isUp ? 'arrow-up' : 'arrow-down'} size = {16} /> {percent}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

currentBal2Col.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node,
  tagAct: PropTypes.string,
  code: PropTypes.string,
  name: PropTypes.string,
  usedBal: PropTypes.string,
  initialBal: PropTypes.string,
  percent: PropTypes.string,
  currentBal: PropTypes.string,
  statusAct:PropTypes.string,
  onPress: PropTypes.func,
};

export default currentBal2Col
