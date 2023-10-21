import React, { Fragment } from 'react'
import { View, TouchableOpacity , Image, Pressable  } from 'react-native'
import PropTypes from 'prop-types'
import {font , colors, BaseStyle, Typography} from '../../../theme'
import  Icon from '../../Icon'
import MaterialIcon from 'react-native-vector-icons/Ionicons'
import Text from '../../Text'
import styles from './styles'
const logo = "../../../assets/image/logo-hand.png"


const HeaderHome = (props) => {
  const defaultAvatar = "../../../assets/image/profile-4.jpg"
  const { userName = '' , userAvatar = "", onPressLeft= ()=> {}, onPressRight = () => {}, style = {}, ComponentRight } = props

  return (
    <Fragment>
      <View style={[styles.header, style]}>
        {/* <Image source={ require (defaultAvatar) }  style={styles.avatar} /> */}
        <Image source={ require (logo) }  style={styles.avatarLogo} />
        <TouchableOpacity style={styles.contentHeader} onPress={onPressLeft}>
          <Text subhead light>
            Bonjour 
          </Text>
          <Text body2>{userName}</Text>
        </TouchableOpacity>
        {ComponentRight ? (
          ComponentRight
        ) : (
          <TouchableOpacity style={{ position: 'relative'  }} onPress={onPressRight}>
            <MaterialIcon name= "notifications-outline"  size = {26} color={colors.gray} />
            <View
              style={[
                styles.notyHeader,
                {
                  borderColor: colors.white,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  )
}

HeaderHome.prototype = {
    userName : PropTypes.string , 
    avatar : PropTypes.string, 
    onPressRight : PropTypes.func, 
    onPressLeft : PropTypes.func,
    style :  PropTypes.oneOfType([PropTypes.object, PropTypes.array]), 
    ComponentRight : PropTypes.bool
}
export default HeaderHome
