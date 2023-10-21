import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import {font , colors, BaseStyle, Typography} from '../../../theme'
import Icon from '../../Icon'
import Text from '../../Text'
import styles from './styles'

const Card04 = ({
  title = '',
  price = '',
  icon = '',
  style = {},
  subTitle1 = '',
  subTitle2 = '',
  subTitle3 = '',
  percent1 = '100%',
  percent2 = '50%',
  percent3 = '50%',
  value1 = 'XOF456,897.45',
  value2 = 'XOF100,897.45',
  value3 = 'XOF123,897.45',
  description = '',
  contentStyle = {},
  onPress = () => {},
  disabled = false,
}) => {

  return (
    <TouchableOpacity disabled={disabled} style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.white,
            borderColor: colors.border,
          },
          contentStyle,
        ]}
      >
        <View style={[styles.header]}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: colors.white,
                borderColor : colors.gray,
                borderWidth : 0.5,
              },
            ]}
          >
            <Icon name={icon} size={22} style={{ color: colors.primary }} solid />
          </View>
          <Text body1  style={{ paddingLeft : 5,}}>
            {title}
          </Text>
        </View>

        {/* <Text subhead medium style={{ marginTop: 5 }}>
          {title}
        </Text> */}
        <Text headline style={{ marginTop: 5 , alignSelf: 'center'}}>
          {price}
        </Text>
        <Text caption1 light style={{ marginTop: 10 }}>
          {subTitle1}<Text overline bold > {value1}</Text>
        </Text>
        <View
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: colors.primary,
            marginTop: 5,
            width: percent1,
          }}
        />
        <Text caption1 light style={{ marginTop: 10 }}>
          {subTitle2}<Text overline bold > {value2}</Text>
        </Text>
        <View
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: colors.secondary,
            marginTop: 5,
            width: percent2,
          }}
        />
        <Text caption1 light style={{ marginTop: 10 }}>
          {subTitle3}<Text overline bold > {value3}</Text>
        </Text>
        <View
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: colors.violet,
            marginTop: 5,
            width: percent3,
          }}
        />
        <Text caption2 light style={{ marginTop: 10 }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Card04.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
  subTitle1: PropTypes.string,
  subTitle2: PropTypes.string,
  subTitle3: PropTypes.string,
  percent1: PropTypes.string,
  percent2: PropTypes.string,
  percent3: PropTypes.string,
  value1: PropTypes.string,
  value2: PropTypes.string,
  value3: PropTypes.string,
  description: PropTypes.string,
  contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Card04