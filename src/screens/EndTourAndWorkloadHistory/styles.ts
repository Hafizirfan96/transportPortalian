import { StyleSheet } from 'react-native';
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
  });
};
export default getStyles;
