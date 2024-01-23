import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = (Colors: any, FontSize: any) =>
  StyleSheet.create({
    container: { width: '90%', alignSelf: 'center' },
    textStyle: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(FontSize.small),
      color: Colors.text,
    },
    formView: {
      marginBottom: wp(-10),
    },

    authWrapper: {
      fontFamily: 'SFUIDisplay-medium',
      fontSize: 22,
      flex: 1,
      height: '100%',
      width: '100%',
    },

    errorView: {
      bottom: wp(15),
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
    addButtonStyle: {
      width: wp(20),
      height: hp(20),
    },
    marginBottom30: {
      marginBottom: wp(10),
      marginTop: wp(10),
    },
    editIcon: {
      width: wp(20),
      height: hp(20),
      marginLeft: wp(10),
      resizeMode: 'contain',
    },
    crossIcon: {
      width: wp(20),
      height: hp(20),
      resizeMode: 'contain',
      alignSelf: 'flex-end',
      margin: wp(10),
    },
    modelView: {
      flex: 0.85,
      backgroundColor: Colors.lightGrey,
      borderRadius: wp(5),
    },
    scrollView: {
      top: '15%',
    },
  });
