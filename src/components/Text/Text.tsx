import React from 'react';
import { Platform, StyleSheet, Text , View, ViewProps } from 'react-native';
import PropTypes from 'prop-types';
import { BaseStyle, Typography} from '../../theme'
import font from '../../theme/font'
import colors from '../../theme/colors'
import fontStyles from './styles'

const { Roboto , Raleway , Merriweather} = fontStyles
const Index = (props) =>  {
  const {
    //props style
    header,
    title1,
    title2,
    title3,
    headline,
    headline1,
    body1,
    body2,
    callout,
    subhead,
    footnote,
    caption1,
    caption2,
    overline,
    // props font
    thin,
    ultraLight,
    light,
    regular,
    medium,
    semibold,
    bold,
    heavy,
    black,
    //custom color
    primary,
    secondary,
    green,
    accent,
    red,
    gray,
    divider,
    white,
    //numberOfLines
    numberOfLines,
    textAlign,
    //custom
    style,
    //children
    children,
  } = props;

   let textStyle = StyleSheet.flatten([
    header && Typography.header,
    title1 && Typography.title1,
    title2 && Typography.title2,
    title3 && Typography.title3,
    headline && Typography.headline,
    headline1 && Typography.headline1,
    body1 && Typography.body1,
    body2 && Typography.body2,
    callout && Typography.callout,
    subhead && Typography.subhead,
    footnote && Typography.footnote,
    caption1 && Typography.caption1,
    caption2 && Typography.caption2,
    overline && Typography.overline,
    //custom for font
    thin && { fontWeight: font.weight.thin },
    ultraLight && { fontWeight: font.weight.ultraLight },
    light && { fontWeight: font.weight.light },
    regular && { fontWeight: font.weight.regular },
    medium && { fontWeight: font.weight.medium },
    semibold && { fontWeight:font.weight.semibold },
    bold && { fontWeight: font.weight.bold },
    heavy && { fontWeight: font.weight.heavy },
    black && { fontWeight: font.weight.black },
    //custom for color
    primary && { color: colors.primary },
    secondary && { color: colors.primary },
    green && { color: colors.green },
    accent && { color: colors.accent },
    red && { color: colors.red },
    gray && { color: colors.gray },
    divider && { color: colors.divider},
    white && { color: colors.white },
    { fontFamily: 'Raleway', textAlign },
    style && style,
  ])

  if (textStyle.fontFamily) {
    const fontStyle = textStyle.fontStyle === 'italic' ? 'Italic' : '';
    const fontWeight = textStyle?.fontWeight ?? 400;
  
    switch (textStyle.fontFamily) {
      case 'Raleway':
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          Raleway[fontWeight] === 'Regular' ? Raleway[fontWeight] : Raleway[fontWeight] + fontStyle
        }`;
        break;
      case 'Roboto':
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          Roboto[fontWeight] === 'Regular' ? Roboto[fontWeight] : Roboto[fontWeight] + fontStyle
        }`;
        break;
      case 'Merriweather':
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          Merriweather[fontWeight] === 'Regular' ? Merriweather[fontWeight] : Merriweather[fontWeight] + fontStyle
        }`;
        break;
      default:
        break;
    }
  }
  return (
    <Text style = { textStyle} numberOfLines={numberOfLines}> 
    { children} 
    </Text>
  )

}

// Define typechecking
Index.propTypes = {
  //define style
  header: PropTypes.bool,
  title1: PropTypes.bool,
  title2: PropTypes.bool,
  title3: PropTypes.bool,
  headline: PropTypes.bool,
  headline1: PropTypes.bool,
  body1: PropTypes.bool,
  body2: PropTypes.bool,
  callout: PropTypes.bool,
  subhead: PropTypes.bool,
  footnote: PropTypes.bool,
  caption1: PropTypes.bool,
  caption2: PropTypes.bool,
  overline: PropTypes.bool,
  //define font custom
  thin: PropTypes.bool,
  ultraLight: PropTypes.bool,
  light: PropTypes.bool,
  regular: PropTypes.bool,
  medium: PropTypes.bool,
  semibold: PropTypes.bool,
  bold: PropTypes.bool,
  heavy: PropTypes.bool,
  black: PropTypes.bool,
  //custon for text color
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  green: PropTypes.bool, //
  accent: PropTypes.bool,
  red: PropTypes.bool,
  gray: PropTypes.bool,
  divider: PropTypes.bool,
  white: PropTypes.bool,
  fieldColor: PropTypes.bool,
  //numberOfLines
  numberOfLines: PropTypes.number,
  textAlign: PropTypes.string,
  //custom style
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node, // plain text
}
Index.defaultProps = {
  //props for style
  header: false,
  title1: false,
  title2: false,
  title3: false,
  headline: false,
  headline1: false,
  body1: false,
  body2: false,
  callout: false,
  subhead: false,
  footnote: false,
  caption1: false,
  caption2: false,
  overline: false,
  //props for font
  thin: false,
  ultraLight: false,
  light: false,
  regular: false,
  medium: false,
  semibold: false,
  bold: false,
  heavy: false,
  black: false,
  //custon for text color
  primaryColor: false,
  darkPrimaryColor: false,
  green: false,
  accent : false,
  red : false,
  gray : false,
  divider : false,
  white : false,
  fieldColor: false,
  //numberOfLines
  numberOfLines: 10,
  textAlign: 'left',
  //custom style
  style: {},
  children: '',
}

export default Index