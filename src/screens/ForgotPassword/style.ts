import { wp } from '@/utils/layout-scaling';
import { StyleSheet } from 'react-native';

const getStyles = (colors: any) => {
  return StyleSheet.create({
    logo: {
      marginTop: '5%',
      height: wp(150),
      width: wp(150),
    },
    signInText: {
      fontFamily: 'OsloSans-Bold',
      color: colors.black,
      fontSize: wp(27),
      marginBottom: wp(18),
      lineHeight: wp(30),
    },
    authWrapper: {
      fontFamily: 'SFUIDisplay-medium',
      fontSize: wp(20),
      backgroundColor: colors.white,
    },
    formWrapper: {
      width: '90%',
    },
    errorView: {
      bottom: wp(13),
    },
    error: {
      fontFamily: 'sf-ui-display-regular',
      color: colors.red,
      fontSize: wp(14),
    },

    subtitle: {
      fontFamily: 'sf-ui-display-regular',
      fontSize: wp(13),
    },
    subtitleView: {
      bottom: wp(20),
    },
    imageIcon: { width: wp(20), height: wp(18), opacity: 0.7 },
    backArrow: { width: wp(13), height: wp(22) },
  });
};
export default getStyles;
