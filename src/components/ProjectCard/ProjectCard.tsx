import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import colors from '../../theme/colors'
import ProgressCircle from '../ProgressCircle'
import Text from '../Text'
import styles from './styles'

const ProjectCard = ({
  title = '',
  style = {},
  onPress = () => {},
  description = '',
  progress = 0,
  disabled = false,
  days = '',
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
            <Text caption1 style = {{ position:'absolute', bottom: 0.5,}} >
              {reference} <Text footnote bold > {label} </Text>
            </Text>
          </View>
          <View style={styles.viewRight}>
            <ProgressCircle style={{ marginBottom: 10 }} percent={progress} />
            <Text footnote light>
              {days}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProjectCard.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  progress: PropTypes.number,
  days: PropTypes.string,
  label: PropTypes.string,
  reference: PropTypes.string,
  members: PropTypes.array,
};

export default ProjectCard