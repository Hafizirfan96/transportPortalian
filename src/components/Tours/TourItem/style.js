import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';
const getStyles = colors =>
  StyleSheet.create({
    km: {
      marginTop: wp(10),
      paddingTop: wp(10),
      borderTopWidth: wp(1.5),
      borderColor: colors.borderColor,
    },
    iconStyle: {
      top: wp(-8),
    },

    status: {
      top: wp(-10),
      right: wp(4),
    },
    selfView: { flex: 0.5 },
    limit: { maxWidth: wp(100) },
    toggleImage: {
      width: wp(32),
      height: wp(20),
    },
  });
export default getStyles;
