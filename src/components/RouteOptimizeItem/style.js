import { wp } from '@/utils/layout-scaling';
import { StyleSheet } from 'react-native';

const getStyles = Colors => {
  return StyleSheet.create({
    backgroundColor: {
      backgroundColor: Colors.background,
    },
    locationImage: {
      width: wp(16),
      height: wp(22),
    },
    workloadName: {
      maxWidth: wp(180),
    },
    locationWrapper: {
      width: 55,
      height: 55,
      backgroundColor: Colors.background,
      borderRadius: 27,
    },
  });
};

export default getStyles;
