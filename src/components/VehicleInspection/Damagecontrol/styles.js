import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = Colors =>
  StyleSheet.create({
    container: {
      marginLeft: wp(20),
      marginRight: wp(20),
      marginTop: wp(-20),
      marginBottom: wp(10),
      height: hp(50),
    },
    containerText: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(14),
      color: Colors.black,
      marginLeft: wp(15),
      alignSelf: 'center',
    },
    togglebutton: {
      width: wp(35),
      height: hp(25),
      marginTop: wp(18),
      marginRight: wp(15),
    },
    imageStyle: {
      width: wp(300),
      height: hp(200),
      marginTop: -10,
      resizeMode: 'contain',
      marginLeft: wp(40),
    },
    margimbottom10: {
      marginBottom: wp(10),
    },
    colorwhite: {
      color: Colors.black,
    },
    height40: {
      height: hp(40),
    },
    marginLeftRight: {
      marginLeft: wp(20),
      marginRight: wp(20),
    },
  });
