import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';
const getStyles = () =>
  StyleSheet.create({
    iconStyle: {
      top: wp(-8),
    },
    selfView: { flex: 0.5 },
    endTimeView: { flex: 0.5 },
  });
export default getStyles;
