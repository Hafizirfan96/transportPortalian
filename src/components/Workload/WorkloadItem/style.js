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
    width: '82%',
    marginTop: -20,
    zIndex: -10,
    marginHorizontal: wp(42),
  },
  workloadName: {
    maxWidth: wp(180),
  },
});
