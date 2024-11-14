import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = (Colors: any, FontSize: any) =>
  StyleSheet.create({
    container: { width: '90%', alignSelf: 'center' },
    textStyle: {
      fontFamily: 'OsloSans-Bold',
      fontSize: FontSize.smallNormal,
      color: Colors.black,
    },
    formView: {
      marginBottom: wp(-10),
    },
    lengthHWview: {
      width: '31%',
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
    editIcon: {
      width: wp(20),
      height: hp(20),
      marginLeft: wp(10),
      resizeMode: 'contain',
    },
  });
