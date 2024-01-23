import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';
import { Colors } from '@/theme/Variables';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: wp(6),
  },
  card: {
    marginTop: wp(1),
  },
  imageView: {
    margin: wp(2),
  },
  imagewithHeight: {
    width: wp(80),
    height: hp(50),
    resizeMode: 'contain',
  },
  textstyleSmall: {
    fontSize: hp(12),
    marginRight: wp(10),
    fontFamily: 'OsloSans-Bold',
  },
  togglebutton: {
    width: wp(40),
    height: hp(25),
  },
  addbutton: {
    width: wp(50),
    height: hp(50),
  },
  width60: {
    width: wp(60),
  },
  margin5: {
    margin: wp(5),
  },
  margintop5: {
    marginTop: wp(5),
  },
  margintopminus5: {
    marginTop: -5,
  },
  bottomlayout: {
    marginLeft: wp(10),
    marginRight: wp(10),
    marginBottom: wp(10),
    paddingTop: wp(10),
    borderTopWidth: wp(1),
    borderTopColor: '#777',
  },
  iconstyle: {
    width: wp(18),
    height: hp(18),
    marginLeft: wp(10),
    resizeMode: 'contain',
  },
  bottomInputTextStyle: {
    minWidth: wp(100),
    height: wp(36),
    textAlign: 'right',
    marginTop: wp(-10),
    marginRight: wp(0),
    maxWidth: 100,
  },
  killometersView: {
    marginTop: 10,
  },
});
