import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (Colors: any) => {
  return StyleSheet.create({
    container: {
      height: wp(42),
    },
    tabBar: {
      paddingVertical: wp(8),
      paddingHorizontal: wp(12),
      borderTopLeftRadius: wp(5),
      borderTopRightRadius: wp(5),
    },
    tabContainerStyle: {
      width: 'auto',
      paddingHorizontal: 0,
    },
    controllerChildView: {
      height: wp(80),
    },
    transprent: {
      backgroundColor: Colors.transprent,
    },
    tabStyle: {
      backgroundColor: Colors.appColor,
    },
  });
};
export default getStyles;
