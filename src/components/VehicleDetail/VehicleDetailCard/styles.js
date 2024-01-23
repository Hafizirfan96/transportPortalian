import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = (Colors, FontSize) =>
  StyleSheet.create({
    imagewidthHeight: {
      width: wp(200),
      height: hp(120),
    },

    bottomlayout: {
      borderTopWidth: wp(1.5),
      borderTopColor: '#cfcfce',
    },
    iconstyle: {
      width: wp(19),
      height: hp(19),
      marginLeft: wp(10),
      resizeMode: 'contain',
    },
  });
