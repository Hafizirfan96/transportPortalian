import { wp } from '@/utils/layout-scaling';
import { StyleSheet } from 'react-native';

const getStyles = (Colors: any) => {
  return StyleSheet.create({
    markerView: {
      width: wp(20),
      height: wp(20),
      backgroundColor: Colors.error,
      borderRadius: wp(10),
    },
    marker: {
      top: wp(20),
      right: wp(20),
    },

    // zoomButton: {
    //   backgroundColor: 'rgba(255, 255, 255, 0.7)',
    //   padding: 10,
    //   borderRadius: 5,
    // },
    pinContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    pinHead: {
      width: 20, // Adjust size as needed
      height: 20, // Adjust size as needed
      borderRadius: 10, // Half of width and height to make it a circle
      backgroundColor: Colors.primary, // Color of the pin head
    },
    pinStem: {
      width: 4, // Adjust size as needed
      height: 30, // Adjust size as needed
      backgroundColor: Colors.primary, // Color of the pin stem
    },

    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: Colors.lightGray, // Background color of the search container
      borderRadius: 5,
    },
    searchInput: {
      flex: 1,
      backgroundColor: 'white', // Background color of the search input
      borderRadius: 5,
      marginHorizontal: 15,
      paddingLeft: 10,
    },
    searchButton: {
      backgroundColor: Colors.primary, // Background color of the search button
      paddingHorizontal: 25,
      paddingVertical: 10,
      borderRadius: 5,
    },
    page: {
      flex: 1,
    },

    map: {
      flex: 1,
    },
    zoomContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      flexDirection: 'column',
      zIndex: 1,
    },
    zoomButton: {
      backgroundColor: Colors.white,
      padding: 10,
    },
    zoomText: {
      fontSize: 20,
      color: Colors.black,
      fontWeight: 'bold',
    },
    image: {
      width: wp(30),
      height: wp(30),
    },
    calloutContainer: {
      backgroundColor: Colors.white,
      shadowColor: Colors.black,
      width: wp(100),
      padding: 5,
    },
    calloutText: {
      color: Colors.black,
    },
  });
};

export default getStyles;
