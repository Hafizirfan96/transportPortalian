import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = Colors =>
  StyleSheet.create({
    itemQuestionsText: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
    },
    itemQuestionsMargin: {
      marginTop: wp(15),
      marginBottom: wp(15),
    },
    createDot: {
      backgroundColor: Colors.black,
      width: wp(8),
      height: hp(8),
      borderRadius: wp(4),
      marginTop: wp(19),
    },
    checkbox: {
      marginLeft: wp(20),
      marginTop: wp(6),
      height: hp(26),
    },
    marginleft3: {
      marginLeft: wp(3),
    },
    marginLeft5: {
      marginLeft: wp(15),
    },
    marginLeft6: {
      marginLeft: wp(25),
    },
    marginLeft7: {
      marginLeft: wp(35),
    },
    radioButtonMainView: { width: wp(195) },
    inputText: {
      minHeight: hp(80),
      borderWidth: 0.7,
      borderRadius: wp(5),
      borderColor: Colors.grey,
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      paddingLeft: wp(10),
      paddingRight: wp(10),
      backgroundColor: Colors.white,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
  });
