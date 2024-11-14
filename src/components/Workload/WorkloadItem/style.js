import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/layout-scaling';

export default styles = StyleSheet.create({
  mainCheckbox: {
    marginRight: wp(5),
    borderWidth: wp(0),
    marginLeft: wp(0),
    borderWidth: wp(0),
  },

  arrowUpDownSection: {
    marginRight: wp(0),
    alignItems: 'center',
    marginTop: wp(0),
    borderWidth: wp(0),
  },
  arrowUpDown: {
    fontSize: wp(30),
  },

  touchableButton: {
    color: '#2A2859',
    marginLeft: wp(5),
    textDecorationLine: 'underline',
  },

  subItem: {
    width: '88.5%',
    // zIndex: -10,
    marginLeft: wp(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 }, // Negative height for top shadow
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10, // Adds depth to the shadow on Android
  },
  workloadName: {
    maxWidth: wp(180),
  },
});
