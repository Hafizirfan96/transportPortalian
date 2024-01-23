import { wp } from '@/utils/layout-scaling';
import { StyleSheet } from 'react-native';

const getStyles = (colors: any) => {
  return StyleSheet.create({
    statusBar: { backgroundColor: colors.white },
    logo: {
      marginLeft: '30%',
      marginRight: '30%',
      marginTop: '15%',
      height: 170,
      width: 170,
    },
    signInText: {
      fontFamily: 'OsloSans-Bold',
      color: colors.black,
      fontSize: wp(28),
      marginBottom: wp(18),
    },

    authWrapper: {
      backgroundColor: colors.white,
    },
    rememberMeWrapper: {
      bottom: wp(6),
      left: wp(5),
    },
    formWrapper: {
      width: '90%',
      marginTop: '5%',
    },
    errorView: {
      bottom: wp(13),
    },
    error: {
      fontFamily: 'sf-ui-display-regular',
      color: colors.red,
      fontSize: wp(14),
    },
    errorColor: {
      color: colors.red,
    },
    imageIcon: { width: wp(20), height: wp(18), opacity: 0.7 },
  });
};
export default getStyles;
