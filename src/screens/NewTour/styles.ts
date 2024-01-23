import { Platform, StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (colors: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
    tabBar: {
      backgroundColor: colors.white,
      transform: [{ rotate: '180deg' }],
      width: '90%',
      shadowColor: colors.white,
    },
    title: {
      transform: [{ rotate: '180deg' }],
      fontSize: wp(16),
    },
    controllerChildView: {
      height: wp(80),
    },
    date: {
      fontFamily: 'OsloSans-Bold',
      color: colors.black,
      fontSize: wp(12),
      marginLeft: wp(10),
      top: wp(1.5),
    },
    alignCenter: {
      width: '90%',
      marginLeft: wp(18),
    },
    errorView: {
      bottom: wp(18),
    },
    error: {
      fontFamily: 'sf-ui-display-regular',
      color: 'red',
      fontSize: wp(16),
      marginLeft: wp(8),
    },
    controlView: {
      width: wp(100),
      height: wp(30),
      backgroundColor: colors.darkGrey,
      borderRadius: wp(3),
    },
    textContainer: {
      backgroundColor: colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: colors.black,
    },
  });
};
export default getStyles;
