import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';
import { useTheme } from '@/hooks';

export default getStyles = ()=> {
  const { Fonts, Layout, Common, Colors, Gutters } = useTheme();

  return StyleSheet.create({
    container: {
      gap: hp(8),
      marginTop: hp(-18),
      ...Gutters.mediumMargin
    },
    damageCard: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Common.itemShadow,
      ...Gutters.smallPadding
    },
    damageBody: {
      gap: hp(8)
    },
    damageCardText: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(14),
      color: Colors.black
    },
    imageContainer: {
      position: 'relative'
    },
    image: {
      width: wp(100),
      height: wp(100),
      ...Gutters.tinyRMargin,
      top: 0,
      left: 0
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -25 }, { translateY: -25 }]
    },
    imageViewFooter: {
      ...Gutters.smallPadding,
      backgroundColor: Colors.lightGrey
    },
    row: {
      ...Layout.rowHCenter,
      gap: 4
    },
    footerTextHeading: {
      ...Fonts.textSmallBold
    },
    footerText: {
      ...Fonts.textTiny,
      flex: 1
    },
    seeAllButton: {
      height: wp(100),
      backgroundColor: 'transparent'
    }
  });
};
