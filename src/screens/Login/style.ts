import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (colors: any) => {
  return StyleSheet.create({
    statusBar: { backgroundColor: colors.white },
    logo: {
      height: wp(100),
      width: wp(100),
    },
    whiteBackground: {
      backgroundColor: colors.white,
    },
    rememberMeWrapper: {
      left: wp(5),
    },
    formWrapper: {
      width: '90%',
    },

    error: {
      color: colors.red,
      fontSize: wp(14),
    },
    errorColor: {
      color: colors.red,
    },
    imageIcon: {
      width: wp(20),
      height: wp(18),
    },
  });
};
export default getStyles;
