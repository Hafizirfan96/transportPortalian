import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (colors: any) => {
  return StyleSheet.create({
    container: {
      marginTop: wp(-15),
    },
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
    lorry: {
      marginLeft: wp(18),
      marginRight: wp(18),
    },
    backgroundColor: {
      backgroundColor: colors.background,
    },
  });
};
export default getStyles;
