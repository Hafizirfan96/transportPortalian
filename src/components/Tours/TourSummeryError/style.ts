import { StyleSheet } from 'react-native';
import { hp, wp } from '@/utils/layout-scaling';
const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.warningColor,
    },
    iconStyle: {
      top: wp(-8),
    },
    selfView: { flex: 0.5 },
    endTimeView: { flex: 0.5 },
    imageStyle: {
      width: wp(20),
      height: hp(20),
    },
    warningHeading: {
      fontSize: wp(9),
      paddingTop: wp(4),
      fontFamily: 'OsloSans-Bold',
    },
  });

export default getStyles;
