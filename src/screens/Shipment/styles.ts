import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (Colors: any, FontSize: any) =>
  StyleSheet.create({
    container: { width: '90%', alignSelf: 'center' },
    textStyle: {
      fontFamily: 'OsloSans-Bold',
      fontSize: FontSize.small,
      color: Colors.black,
    },
    addIcon: {
      backgroundColor: Colors.primaryBackground,
      borderRadius: wp(20),
      width: wp(15),
      height: wp(15),
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
      height: wp(20),
    },
    marginBottom30: {
      marginBottom: wp(10),
      marginTop: wp(10),
    },
    editIcon: {
      width: wp(29),
      height: wp(29),
      marginLeft: wp(10),
    },
    crossIcon: {
      width: wp(18),
      height: wp(18),
    },
    modelView: {
      flex: 0.85,
      backgroundColor: Colors.lightGrey,
      borderRadius: wp(5),
    },
    scrollView: {
      top: '15%',
    },
    whiteSpace: {
      height: wp(5),
      backgroundColor: Colors.white,
    },
  });

export default getStyles;
