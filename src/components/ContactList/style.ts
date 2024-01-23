import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (colors: any, fonts: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
    avtar: {
      width: wp(52),
      height: wp(52),
      borderRadius: wp(52),
    },
    authorText: {
      ...fonts.textSmallBold,
      fontSize: wp(20),
    },
    scheduleText: {
      ...fonts.textSmallBold,
      color: colors.placeHolderColor,
      top: wp(-4),
    },
    phoneText: {
      ...fonts.textMediumBold,
      color: colors.appColor,
    },
    shiftImage: { width: wp(35), height: wp(35) },
    activeColor: {
      width: wp(60),
      height: wp(20),
      backgroundColor: colors.appColor,
      borderRadius: wp(15),
    },
    inActiveColor: {
      width: wp(60),
      height: wp(20),
      backgroundColor: colors.primaryTextColor,
      borderRadius: wp(15),
    },
    activeText: {
      color: colors.white,
    },
    nameView: { width: '76%' },
  });
};

export default getStyles;
