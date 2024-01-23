import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

const getStyles = Colors =>
  StyleSheet.create({
    deleteBtn: {
      width: wp(25),
      height: hp(25),
      marginLeft: wp(5),
    },
    controlView: {
      width: wp(100),
      height: wp(30),
      backgroundColor: Colors.darkGrey,
      borderRadius: wp(3),
    },
    errorItem: {
      borderWidth: wp(2),
      borderColor: Colors.red,
      borderLeftColor: Colors.red,
      borderTopColor: Colors.red,
    },
    error: {
      fontFamily: 'sf-ui-display-regular',
      color: Colors.red,
      fontSize: hp(16),
      marginLeft: wp(10),
      marginTop: -15,
      marginBottom: wp(15),
    },
    errorColor: {
      color: Colors.red,
    },
    textStyleBold: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      marginTop: wp(15),
      width: wp(140),
    },
    textStyleSmallBold: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      marginTop: wp(17),
      marginLeft: wp(15),
    },
    quanity: {
      marginLeft: wp(23),
    },
    textStyleMedium: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      marginRight: wp(3),
    },

    InputText: {
      width: wp(50),
      height: wp(30),
      backgroundColor: Colors.darkGrey,
      borderRadius: wp(3),
      marginLeft: wp(65),
      padding: wp(6),
    },
    ProductInputItem: {
      backgroundColor: Colors.grey,
      borderRadius: wp(5),
      width: wp(140),
      height: hp(45),
    },
    InputTexts: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(18),
      paddingLeft: wp(8),
      paddingRight: wp(8),
      width: wp(140),
      height: hp(45),
    },
    checkbox: {
      alignSelf: 'center',
      marginLeft: wp(35),
    },
    commentInputText: {
      height: hp(100),
      marginBottom: wp(15),
      borderWidth: wp(1),
      borderRadius: wp(5),
      borderColor: 'gray',
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      paddingLeft: wp(10),
      paddingRight: wp(10),
      width: '100%',
    },

    addButtonStyle: {
      width: wp(15),
      height: hp(15),
    },
    marginhorizontal30: {
      marginHorizontal: wp(30),
      bottom: wp(20),
    },
    marginbottom15: {
      marginBottom: wp(10),
    },
    errorText: {
      color: Colors.primary,
      left: wp(10),
      top: wp(5),
    },
    marginRight10: {
      marginRight: wp(10),
    },
    marginBottom30: {
      marginBottom: wp(10),
      marginTop: wp(10),
    },
    marginvertical10: {
      marginVertical: wp(10),
    },
    colorwhite: {
      color: Colors.black,
    },
    width150: {
      width: wp(150),
      bottom: wp(10),
    },
    fontAwism: {
      right: wp(15),
      top: wp(10),
    },
  });

export default getStyles;
