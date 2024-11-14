/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { wp } from '@/utils/layout-scaling';

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  primaryTextColor: '#2C2C2C',
  secondaryTextColor: '#333333',
  primaryBackground: '#43F8B6',
  secondaryBackground: '#618a5c',
  tabBackground: '#4ae9aa',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  black: '#000000',
  text: '#2C2C2C',
  primary: '#E14032',
  success: '##43F8B6',
  error: '#FF8274',
  warning: '#F9C66B',
  lightGrey: '#F9F9F9',
  appColor: '#43F8B6',
  darkGrey: '#EEEEEE',
  lightBlack: '#606367',
  signatureColor: '#f0ffff',
  //darkGrey: '#696969',
  grey: '#666666',
  red: '#FF5252',
  green: '#4CAF50',
  darkGreen: '#618a5c',
  blue: '#026aa7',
  yellow: '#ff9f1a',
  lightGreen: '#B5DCA8',
  placeHolderColor: '#BDBDBD',
  borderColor: '#cfcfce',
  warningColor: '#F66667',
  background: '#e9eef6',
  schedul: '#708fbe',
  darkgray: '#9CB3D6',
  iconBlackGrey: '#554E53',
  emptyBorderColor: '#CEDAEC',
};

export const NavigationColors = {
  primary: Colors.primaryTextColor,
};

/**
 * FontSize
 */
export const FontSize = {
  tiny: wp(11),
  smallTiny: wp(12), // Font size 12
  small: wp(13),
  smallNormal: wp(14), //Adding Font size 14
  normal: wp(15),
  regular: wp(18),
  regularMedium: wp(20), //Adding new Font size to numbers
  medium: wp(21),
  mediumPlus: wp(22),
  large: wp(40),
  exLarge: wp(50),
};

/**
 * Metrics Sizes
 */
const tiny = wp(5); // 10
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const medium = tiny * 4; // 40
const mediumPlus = tiny * 5; // 50
const mediumlittPlus = tiny * 6; //Adding new for lagetnavn
const large = tiny * 7; // 30
const extraLarge = tiny * 8; // 30
const xxLarge = tiny * 10;
export const MetricsSizes = {
  tiny,
  small,
  regular,
  medium,
  mediumPlus,
  mediumlittPlus,
  large,
  extraLarge,
  xxLarge,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
