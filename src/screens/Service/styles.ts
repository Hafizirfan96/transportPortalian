import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = (colors: any) =>
  StyleSheet.create({
    textContainer: {
      backgroundColor: colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: colors.black,
      marginTop: wp(5),
      bottom: wp(2),
    },
    commentInputText: {
      height: hp(270),
      borderRadius: wp(5),
      borderColor: 'gray',
      fontFamily: 'OsloSans-Bold',
      color: colors.text,
      padding: wp(18),
    },
    submitbutton: {
      marginTop: wp(18),
      width: '90%',
      height: wp(35),
      marginLeft: wp(18),
      backgroundColor: colors.white,
      fontSize: wp(20),
      elevation: wp(10),
      shadowColor: colors.black,
      borderRadius: wp(20),
    },

    uploadImge: { marginTop: wp(20) },
    ItemWrapper: {
      paddingTop: wp(10),
      paddingBottom: wp(10),
      left: wp(6),
    },
    togglebutton: {
      marginRight: wp(6),
      marginLeft: wp(0),
    },
    authWrapper: {
      fontFamily: 'SFUIDisplay-medium',
      fontSize: 22,
      backgroundColor: colors.white,
      flex: 1,
      height: '100%',
      width: '100%',
    },
    signInText: {
      fontFamily: 'OsloSans-Bold',
      color: colors.black,
      fontSize: wp(12),
      marginLeft: wp(10),
      bottom: wp(12),
    },
    alignCenter: {
      width: '90%',
      marginLeft: wp(18),
      bottom: wp(5),
      top: wp(1),
    },
    controllerChildView: {
      height: wp(70),
    },
    formWrapper: {
      width: '90%',
      marginTop: '5%',
    },
    date: {
      fontFamily: 'OsloSans-Bold',
      color: colors.black,
      fontSize: wp(12),
      // marginLeft: wp(10),
      top: wp(10),
    },
    dates: {
      fontFamily: 'OsloSans-Bold',
      color: colors.black,
      fontSize: wp(12),
      marginTop: wp(5),
    },
    description: {
      backgroundColor: colors.white,
      borderRadius: wp(5),
      elevation: wp(5),
      shadowColor: colors.black,
      minHeight: wp(100),
      marginTop: 5,
      textAlignVertical: 'top',
      paddingLeft: 10,
      borderColor: colors.grey,
      fontFamily: 'OsloSans-Bold',
      color: colors.text,
      padding: wp(10),
    },
    controllerView: {
      bottom: wp(12),
    },
    input: {
      fontFamily: 'OsloSans-Bold',
      color: colors.black,
      fontSize: wp(12),
      bottom: wp(1.5),
      marginLeft: wp(10),
    },
    error: {
      fontFamily: 'sf-ui-display-regular',
      color: 'red',
      fontSize: 16,
      // marginLeft: 10,
    },
    dateView: {
      backgroundColor: colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: colors.black,
    },
    dateText: {
      height: 55,
      padding: 17,
      marginLeft: 5,
      fontSize: 15,
    },
    errorView: {
      // bottom: wp(5),
    },
    dropdown: {
      fontFamily: 'OsloSans-Bold',
      color: colors.placeHolderColor,
      fontSize: wp(12),
    },
    pickerItem: {
      color: colors.black,
      fontFamily: 'OsloSans-Bold',
    },
    box: { top: wp(5), bottom: wp(4) },
  });
