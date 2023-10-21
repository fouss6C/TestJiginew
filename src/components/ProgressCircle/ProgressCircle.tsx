import React from 'react';
import { View } from 'react-native';
import colors from '../../theme/colors'
import Text from '../Text'
import CircularProgress from './CircularProgress'

const ProgressCircle = ({ percent = 0, size = 60, borderWidth = 5, style = {} }) => {
  
  return (
    <View style={style}>
      <CircularProgress
        percentage={percent}
        progressWidth={size / 2 - borderWidth}
        size={size}
        blankColor={colors.black}
        donutColor={colors.primary}
        fillColor={colors.card}
      >
        <Text headline>{percent}%</Text>
      </CircularProgress>
    </View>
  )
}

export default ProgressCircle