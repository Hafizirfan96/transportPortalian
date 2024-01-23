import { StyleSheet, Platform } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = colors =>
  StyleSheet.create({
    textContainer: {
      backgroundColor: colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: colors.black,
      width: '90%',
      height: '40%',
      marginLeft: wp(18),
      bottom: wp(18),
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
    image: {
      width: wp(93),
      height: wp(100),
    },

    uploadImge: { marginTop: wp(20) },
  });
