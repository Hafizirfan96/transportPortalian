import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default getStyles = (Colors, FontSize) =>
  StyleSheet.create({
    textStyle: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.text,
      marginTop: wp(10),
      color: Colors.black,
    },
    distanceHeading: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
      marginBottom: wp(5),
    },
    referenceInputText: {
      height: wp(35),
      paddingLeft: wp(10),
      paddingRight: wp(10),
      color: 'black',
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
    },
    marginBottom: {
      marginBottom: wp(15),
    },
    error: {
      fontFamily: 'sf-ui-display-regular',
      color: Colors.red,
      fontSize: wp(10),
    },
    width40: {
      width: '100%',
    },
  });
