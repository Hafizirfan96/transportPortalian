import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (Colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.backgroundColor,
    },
    marginvertical10: {
      marginVertical: wp(10),
    },

    colorwhite: {
      color: Colors.black,
    },
    killometerText: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
    },
    kmText: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
      maxWidth: wp(100),
      left: wp(10),
      height: wp(35),
    },
    noteIcon: {
      width: wp(28),
      height: wp(28),
      resizeMode: 'contain',
    },
    marginLeftRight: {
      marginLeft: wp(50),
      marginRight: wp(20),
    },
    height40: {
      height: wp(40),
    },
  });

export default getStyles;
