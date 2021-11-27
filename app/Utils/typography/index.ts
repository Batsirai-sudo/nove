import { StyleSheet } from "react-native";

/**
 * Fontweight setting
 * - This font weight will be used for style of screens where needed
 * - Check more how to use font weight with url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const FontWeight = {
  thin: "100",
  ultraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
  black: "900"
};

const fontBaseXXXSmall = 10;
const fontBaseXXSmall = 11;
const fontBaseXSmall = 12;
const fontBaseMSmall = 13;
const fontBaseSmall = 15;
const fontBaseNormal = 17;
const fontBaseLarge = 20;
const fontBaseXLarge = 24;
const fontBaseXXLarge = 28;
const fontBaseXXXLarge = 34;

/**
 * Typography setting
 * - This font weight will be used for all template
 * - Check more how to use typography in url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const Typography = StyleSheet.create({
  header: {
    fontSize: fontBaseXXXLarge,
    fontWeight: FontWeight.regular
  },
  title1: {
    fontSize: fontBaseXXLarge,
    fontWeight: FontWeight.regular
  },
  title2: {
    fontSize: fontBaseXLarge,
    fontWeight: FontWeight.regular
  },
  title3: {
    fontSize: fontBaseLarge,
    fontWeight: FontWeight.regular
  },
  headline: {
    fontSize: fontBaseNormal,
    fontWeight: FontWeight.regular
  },
  body1: {
    fontSize: fontBaseNormal,
    fontWeight: FontWeight.regular
  },
  body2: {
    fontSize: fontBaseSmall,
    fontWeight: FontWeight.regular
  },
  callout: {
    fontSize: fontBaseNormal,
    fontWeight: FontWeight.regular
  },
  subhead: {
    fontSize: fontBaseSmall,
    fontWeight: FontWeight.regular
  },
  footnote: {
    fontSize: fontBaseMSmall,
    fontWeight: FontWeight.regular
  },
  caption1: {
    fontSize: fontBaseXSmall,
    fontWeight: FontWeight.regular
  },
  caption2: {
    fontSize: fontBaseXXSmall,
    fontWeight: FontWeight.regular
  },
  overline: {
    fontSize: fontBaseXXXSmall,
    fontWeight: FontWeight.regular
  }
});
