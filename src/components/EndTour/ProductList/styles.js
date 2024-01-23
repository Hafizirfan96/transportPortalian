import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

const getStyles = (Colors, FontSize) =>
  StyleSheet.create({
    textStyleBold: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(FontSize.regular),
      color: Colors.text,
      marginTop: wp(15),
      width: wp(150),
    },
    textStyleSmallBold: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(FontSize.small),
      color: Colors.text,
      marginTop: wp(17),
    },
    InputTextItem: {
      width: wp(80),
      borderRadius: wp(5),
      marginTop: wp(10),
    },
    InputText: {
      maxWidth: wp(25),
      padding: wp(5),
    },
    InputView: {
      width: wp(50),
      height: wp(25),
      backgroundColor: Colors.darkGrey,
      borderRadius: wp(3),
      top: wp(10),
      marginLeft: wp(20),
    },
    ProductItemText: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      width: wp(135),
      textAlignVertical: 'center',
      marginLeft: wp(10),
    },
    checkbox: {
      alignSelf: 'center',
      height: hp(24),
      width: wp(22),
      marginLeft: wp(5),
    },
    commentInputText: {
      height: hp(100),
      top: wp(10),
      marginBottom: wp(10),
      borderWidth: wp(1),
      borderRadius: wp(5),
      borderColor: 'gray',
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      paddingLeft: wp(10),
      paddingRight: wp(10),
    },
    marginhorizontal30: {
      marginHorizontal: wp(30),
    },

    fontAwesm: {
      top: wp(8),
      left: wp(10),
    },
  });

export default getStyles;
