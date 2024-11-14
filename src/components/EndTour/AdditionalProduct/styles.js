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
      width: wp(140),
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
    toastError: {
      fontFamily: 'OsloSans-regular',
      color: Colors.error,
      marginTop: wp(5),
      textAlign: 'center',
    },
    errorColor: {
      color: Colors.red,
    },
    textStyleBold: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
      marginTop: wp(15),
      width: wp(140),
    },
    textStyleSmallBold: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
      marginTop: wp(17),
      marginLeft: wp(15),
    },
    quanity: {
      marginLeft: wp(23),
    },
    textStyleMedium: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
    },

    InputText: {
      width: wp(50),
      height: wp(25),
      backgroundColor: Colors.darkGrey,
      borderRadius: wp(3),
      marginLeft: wp(25),
      padding: wp(6),
      color: Colors.black,
      paddingRight: wp(13),
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
    textarea: {
      height: hp(100),

      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
      paddingLeft: wp(10),
      paddingRight: wp(10),
      width: '100%',
    },
    checkbox: {
      alignSelf: 'center',
      marginLeft: wp(25),
    },
    borderColor: {
      borderWidth: wp(1),
      borderRadius: wp(5),
      borderColor: 'gray',
      marginBottom: wp(15),
    },
    errorBorder: {
      borderWidth: wp(1),
      borderRadius: wp(5),
      borderColor: Colors.red,
      marginBottom: wp(15),
    },
    commentInputText: {
      height: hp(100),
      marginBottom: wp(15),
      borderWidth: wp(1),
      borderRadius: wp(5),
      borderColor: 'gray',
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
      paddingLeft: wp(10),
      paddingRight: wp(10),
      width: '100%',
    },

    addButtonStyle: {
      width: wp(20),
      height: hp(20),
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

    marginvertical10: {
      marginVertical: wp(10),
      height: wp(35),
    },
    colorwhite: {
      color: Colors.black,
    },
    width150: {
      width: wp(150),
      bottom: wp(10),
      // backgroundColor:Colors.darkGrey,
      color: Colors.black,
    },
    fontAwism: {
      right: wp(10),
      top: wp(6),
    },
    bottomNeProduct: { bottom: hp(15) },
  });

export default getStyles;
