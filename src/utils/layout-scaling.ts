// import {
//     widthPercentageToDP as wp2dp,
//     heightPercentageToDP as hp2dp,
//   } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 360, 760 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const wp = (dimension: number): number => {
  //return wp2dp((dimension / 360) * 100 + '%')

  return Platform?.isPad ? moderateScale(dimension, 0.3) : scale(dimension);
  //return scale(dimension)
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * * 360, 760 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const hp = (dimension: number): number => {
  //return hp2dp((dimension / 760) * 100 + '%')
  return verticalScale(dimension);
};

export const ms = (size: number, factor: number = 0.5): number =>
  moderateScale(size, factor);
export const mvs = (size: number, factor: number = 0.5): number =>
  moderateVerticalScale(size, factor);
