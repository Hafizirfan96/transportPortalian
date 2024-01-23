import { StyleSheet } from 'react-native';
import { wp } from '@/utils/layout-scaling';

const getStyles = (colors: any, layout: any) => {
  return StyleSheet.create({
    ItemSpacing: {
      //marginLeft: wp(15),
      //marginRight: wp(15),
      marginBottom: wp(10),
      //marginTop: wp(10),
    },
    ItemWrapper: {
      paddingTop: wp(10),
      paddingBottom: wp(10),
      //borderBottomColor: 'gray',
      // borderBottomWidth: 1,
    },
    filterTypeIcon: {
      color: colors.green,
      marginTop: 5,
      borderWidth: 0,
      marginLeft: -10,
    },

    filterTypeSelected: {
      backgroundColor: colors.lightGreen,
    },
    filterContainer: {
      width: wp(34),
      height: wp(34),
      borderRadius: wp(34),
      borderWidth: 1,
      backgroundColor: colors.white,
      borderColor: colors.white,
      ...layout.center,
    },
    filterIconSpacing: {
      paddingTop: wp(2),
    },
    selectedFilter: {
      backgroundColor: colors.error,
      borderRadius: wp(20),
      width: wp(8),
      height: wp(8),
      position: 'absolute',
      top: 2,
      right: -2,
    },
    filters: { marginRight: wp(6), marginLeft: wp(0) },
  });
};
export default getStyles;
