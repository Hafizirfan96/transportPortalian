import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';
import { ThemeColors } from '@/Theme/theme.type';

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    headerStyles: {
      backgroundColor: colors.primaryBackground,
      paddingHorizontal: wp(20),
      paddingVertical: wp(10),
      paddingBottom: wp(30),
      borderBottomEndRadius: wp(10),
      borderBottomStartRadius: wp(10),
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
    backArrow: { width: wp(13), height: wp(22) },
  });

export default getStyles;
