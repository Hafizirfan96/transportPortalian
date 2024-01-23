import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (colors: any, fonts: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
    shiftToggler: {
      bottom: wp(55),
    },
    avtar: {
      width: wp(52),
      height: wp(52),
      borderRadius: wp(52),
    },

    authorText: {
      ...fonts.textSmallBold,
      fontSize: wp(22),
    },

    scheduleText: {
      ...fonts.textSmallBold,
      color: colors.placeHolderColor,
      top: wp(-4),
    },
    shiftImage: { width: wp(35), height: wp(35) },
    listImage: { width: wp(37), height: wp(37), borderRadius: wp(20) },
    flatListView: {
      backgroundColor: colors.white,
      borderRadius: wp(4),
      padding: wp(13),
      top: -wp(30),
    },
    tabBar: {
      backgroundColor: colors.white,
      width: '90%',
      shadowColor: colors.white,
      marginTop: wp(30),
    },
    workingList: {
      backgroundColor: colors.white,
      borderRadius: wp(2),
      elevation: wp(8),
      shadowColor: colors.black,
    },
    listItem: {
      padding: 5,
      marginVertical: 4,
      marginHorizontal: 1,
    },
    tabbars: {
      bottom: wp(40),
    },
  });
};

export default getStyles;
