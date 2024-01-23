import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = (Colors, FontSize) =>
  StyleSheet.create({
    container: { width: '90%', alignSelf: 'center' },
    textStyle: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(FontSize.small),
      color: Colors.text,
      marginLeft: wp(10),
    },
    InputTextStyle: {
      height: hp(60),
      paddingLeft: wp(10),
      paddingRight: wp(10),
    },
    authWrapper: {
      fontFamily: 'SFUIDisplay-medium',
      fontSize: 22,
      flex: 1,
      height: '100%',
      width: '100%',
    },
    textBoxIcon: {
      marginRight: 10,
    },
    smallFontSize: {
      fontSize: hp(FontSize.small),
    },
    textContainer: {
      backgroundColor: Colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: Colors.black,
      marginTop: wp(18),
    },
    dropdown: {
      backgroundColor: Colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: Colors.black,
      height: wp(50),
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    placeholderStyle: {
      fontSize: wp(15),
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: wp(28),
      height: wp(28),
    },
    inputSearchStyle: {
      height: wp(35),
      fontSize: wp(14),
    },

    item: {
      padding: wp(15),
    },
    selectedStyle: {
      borderRadius: wp(12),
      backgroundColor: Colors.appColor,
      shadowColor: Colors.black,
      marginTop: wp(7),
      marginRight: wp(10),
      paddingHorizontal: wp(10),
      paddingVertical: wp(2),
      left: wp(10),
    },
    textSelectedStyle: {
      marginRight: wp(3),
      fontSize: wp(13),
    },

    itemText: {
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 5,
      margin: 2,
    },
    autoComplete: {
      fontSize: wp(15),
    },
    listContainer: {
      width: wp(329),
      right: wp(17),
    },
    errorView: {
      bottom: wp(13),
    },
    error: {
      fontFamily: 'sf-ui-display-regular',
      color: Colors.red,
      fontSize: wp(14),
    },
    errors: {
      fontFamily: 'sf-ui-display-regular',
      color: Colors.red,
      fontSize: wp(14),
      top: wp(10),
      left: wp(10),
    },
  });
