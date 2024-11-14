import { hp, wp } from '@/utils/layout-scaling';
import { StyleSheet } from 'react-native';

const getStyles = (colors: any, fontSize: any) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'blue',
      // height: '100%',
    },
    marginvertical10: {
      marginVertical: wp(10),
    },
    marginhorizontal30: {
      marginHorizontal: wp(20),
    },
    colorwhite: {
      color: colors.white,
    },
    marginBottom15: {
      marginBottom: wp(15),
    },
    textStyleBold: {
      fontFamily: 'OsloSans-Bold',
      color: colors.text,
      marginTop: wp(18),
      width: wp(112),
    },
    textStyleSmallBold: {
      fontFamily: 'OsloSans-Bold',
      color: colors.text,
      marginTop: wp(17),
    },
    bottom: {
      bottom: wp(30),
    },
    top: { top: hp(5) },
    error: {
      fontFamily: 'OsloSans-regular',
      color: colors.error,
      marginTop: wp(5),
      textAlign: 'center',
    },
  });

export default getStyles;
