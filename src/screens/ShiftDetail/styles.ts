import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (colors: any) => {
  return StyleSheet.create({
    marginToText: {
      marginLeft: wp(20),
      marginRight: wp(20),
    },
    marginTop35: {
      marginTop: wp(35),
    },
    errorMessage: {
      color: colors.red,
      fontSize: wp(15),
    },
  });
};
export default getStyles;
