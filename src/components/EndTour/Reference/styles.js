import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = (Colors, FontSize) =>
  StyleSheet.create({
    textStyle: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      marginTop: wp(20),
      marginBottom: wp(5),
      marginLeft: wp(10),
    },
    distanceHeading: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      marginBottom: wp(5),
      marginLeft: wp(10),
    },
    referenceInputText: {
      height: hp(35),
      paddingLeft: wp(10),
      paddingRight: wp(10),
    },
    InputTextItem: {
      height: hp(35),
      width: wp(140),
    },
    InputText: {
      paddingLeft: wp(10),
      paddingRight: wp(10),
      height: hp(60),
      elevation: 10,
      shadowColor: Colors.black,
    },
    TextInputImage: {
      width: wp(20),
      height: hp(20),
      marginRight: wp(10),
      resizeMode: 'contain',
    },
    marginleft0: {
      marginLeft: wp(0),
    },
    marginhorizontal: {
      marginHorizontal: wp(30),
    },
    referenceView: {
      backgroundColor: Colors.white,
      borderRadius: 4,
      elevation: 10,
      shadowColor: Colors.black,
      marginBottom: 30,
    },
  });
