import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (Colors: any) =>
  StyleSheet.create({
    textContainer: {
      backgroundColor: Colors.white,
      borderRadius: wp(5),
      elevation: wp(10),
      shadowColor: Colors.black,
    },

    dropdown: {
      backgroundColor: Colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: Colors.black,
    },
    pickerContainer: {
      borderRadius: wp(5),
      backgroundColor: Colors.white,
      overflow: 'hidden',
      elevation: 5,
    },
    placeholderStyle: {
      fontSize: wp(15),
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    itemText: {
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 5,
      margin: 2,
      color: Colors.black,
    },
    autoComplete: {
      fontSize: wp(15),
      color: Colors.black,
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
    borderColor: {
      borderColor: Colors.white,
      width: '90%',
      borderRadius: wp(5),
    },
    right: {
      right: wp(10),
    },
    whiteSpace: {
      height: wp(5),
      backgroundColor: Colors.white,
    },
  });

export default getStyles;
