import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

const getStyles = (Colors, FontSize) =>
  StyleSheet.create({
    textStyleBold: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(FontSize.regular),
      color: Colors.black,
      marginTop: wp(15),
      width: wp(150),
    },
    errorItem: {
      borderWidth: wp(1),
      borderColor: Colors.primary,
      borderLeftColor: Colors.primary,
      borderTopColor: Colors.primary,
    },
    error: {
      width: wp(52),
    },
    textStyleSmallBold: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(FontSize.small),
      color: Colors.black,
      marginTop: wp(17),
    },
    InputTextItem: {
      flex: 1,
      borderRadius: wp(5),
      marginTop: wp(10),
      marginLeft: wp(12),
    },
    InputText: {
      width: wp(50),
      padding: wp(5),
      color: Colors.black,
      textAlign: 'left',
      backgroundColor: Colors.white,
    },
    InputTextDisable: {
      backgroundColor: Colors.white,
    },

    InputView: {
      width: wp(50),
      height: wp(25),
      backgroundColor: Colors.darkGrey,
      borderRadius: wp(3),
      top: wp(10),
      marginLeft: wp(20),
    },
    InputViewBlur: {
      width: wp(50),
      height: wp(25),
      backgroundColor: Colors.placeHolderColor,
      borderRadius: wp(3),
      top: wp(10),
      marginLeft: wp(20),
    },
    ProductItemText: {
      color: Colors.black,
      width: wp(100),
      textAlignVertical: 'center',
    },
    checkbox: {
      alignSelf: 'center',
      alignItems: 'center',
    },
    comment: {
      height: wp(19),
      marginTop: wp(5),
    },
    uncheckbox: {
      alignSelf: 'center',
      alignItems: 'center',
      height: hp(24),
      width: '100%',
      // marginLeft: wp(32),
    },
    commentInputText: {
      height: hp(100),
      top: wp(10),
      marginBottom: wp(10),
      borderRadius: wp(5),
      borderColor: 'gray',
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
      paddingLeft: wp(10),
      paddingRight: wp(10),
      backgroundColor: Colors.white,
    },
    marginhorizontal30: {
      marginHorizontal: wp(24),
    },

    fontAwesm: {
      top: wp(8),
      left: wp(0.5),
    },
  });

export default getStyles;
