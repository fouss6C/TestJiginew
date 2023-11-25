import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import colors from '../../theme/colors'
import ProgressCircle from '../ProgressCircle'
import Text from '../Text'
import styles from './styles'

const ProjectCard01 = ({
  title = '',
  style = {},
  onPress = () => {},
  description = '',
  progress = '',
  disabled = false,
  days = '',
  status = 0,
  label = '',
  reference = '',
  members = [],
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
        ]}
      >
        <View style={styles.viewProgress}>
          <View style={styles.viewLeft}>
            <Text headline>{title}</Text>
            <Text caption2 light style={styles.description}>
              {description}
            </Text>
            {/* <Avatars styleThumb={{ width: 30, height: 30 }} users={members} limit={3} /> */}
            <Text caption1 style = {{ position:'absolute', bottom: 0.3 }} >
              {label } <Text footnote bold > {reference} </Text>
            </Text>
          </View>
          <View style={styles.viewRight}>
            <View style = {{ marginVertical : 20 }}>
              <Text  style={{ marginBottom: 5 }} body1>
              {progress}
              </Text>
            </View>
            {/* <ProgressCircle style={{ marginBottom: 10 }} percent={progress} /> */}
            <Text footnote light style = {{ color : (status <=4 ? 'red' : 'green') }}>
              {days}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProjectCard01.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  progress: PropTypes.string,
  days: PropTypes.string,
  status : PropTypes.number,
  label: PropTypes.string,
  reference: PropTypes.string,
  members: PropTypes.array,
};

export default ProjectCard01