import React from 'react'
import * as RNPlaceholder from 'rn-placeholder'
import colors from '../../theme/colors'
import Progressive from './Progressive'

export const PlaceholderLine = ({ style, ...attrs }) => {
  
  return <RNPlaceholder.PlaceholderLine {...attrs} style={[style, { backgroundColor: colors.card }]} />;
};

export const Placeholder = ({ ...attrs }) => {
  return <RNPlaceholder.Placeholder {...attrs} Animation={(props) => <Progressive {...props} duration={1500} />} />;
}