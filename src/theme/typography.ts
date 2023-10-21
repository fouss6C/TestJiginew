import { StyleSheet } from "react-native";
import font from './font'

export const Typography = StyleSheet.create({
    header: {
      fontSize: font.size.xxlg,
      fontWeight: font.weight.bold,
    },
    title1: {
      fontSize: font.size.xlg,
      fontWeight: font.weight.bold
    },
    title2: {
      fontSize: font.size.lg,
      fontWeight: font.weight.bold
    },
    title3: {
      fontSize: font.size.lg,
      fontWeight: font.weight.bold,
    },
    headline: {
      fontSize: font.size.md,
      fontWeight: font.weight.bold,
    },
    headline1: {
      fontSize: font.size.default,
      fontWeight: font.weight.bold,
    },
    body1: {
      fontSize: font.size.md,
      fontWeight: font.weight.regular,
    },
    body2: {
      fontSize: font.size.default,
      fontWeight: font.weight.regular,
    },
    callout: {
      fontSize: font.size.md,
      fontWeight: font.weight.regular,
    },
    subhead: {
      fontSize: font.size.default,
      fontWeight: font.weight.regular,
    },
    footnote: {
      fontSize: font.size.s,
      fontWeight: font.weight.regular,
    },
    caption1: {
      fontSize: font.size.s,
      fontWeight: font.weight.ultraLight,
    },
    caption2: {
      fontSize: font.size.xs,
      fontWeight: font.weight.regular,
    },
    overline: {
      fontSize: font.size.xs,
      fontWeight: font.weight.regular,
    },
  })