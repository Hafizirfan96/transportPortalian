import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (colors: any, props: any) =>
  StyleSheet.create({
    headerStyles: {
      backgroundColor: colors.primaryBackground,
      paddingHorizontal: wp(20),
      paddingVertical: wp(10),
      paddingBottom: props?.notShowIcons ? 0 : wp(35),
      borderBottomEndRadius: props?.notShowIcons ? 0 : wp(10),
      borderBottomStartRadius: props?.notShowIcons ? 0 : wp(10),
    },
    titleMessageTextStyles: {
      fontSize: wp(25),
    },
    locationInfo: {
      top: wp(10),
    },
    locationHeading: {
      width: '70%',
    },
    backArrow: { width: wp(10), height: wp(18) },
    imageIcon: {
      width: wp(40),
      height: wp(40),
    },
  });

export default getStyles;
