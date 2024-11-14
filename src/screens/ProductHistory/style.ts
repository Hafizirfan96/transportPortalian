import { wp } from '@/utils/layout-scaling';
import { StyleSheet } from 'react-native';

const getStyles = (Colors: any) => {
  return StyleSheet.create({
    itemContiner: { marginVertical: wp(7) },

    priceFlex: {
      flex: 0.8,
    },
    quantity: {
      width: wp(57),
    },
    timeIcon: {
      marginTop: wp(4),
      marginRight: wp(2),
    },
    whiteSpace: {
      height: wp(5),
      backgroundColor: Colors.white,
    },
  });
};
export default getStyles;
