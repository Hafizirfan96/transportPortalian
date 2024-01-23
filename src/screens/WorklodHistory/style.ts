import { wp } from '@/utils/layout-scaling';
import { StyleSheet } from 'react-native';

const getStyles = () => {
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
  });
};
export default getStyles;
