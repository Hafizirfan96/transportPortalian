import { wp } from '@/utils/layout-scaling';
import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('window');

const getStyles = (colors, layout, gutters, fonts) =>
  StyleSheet.create({
    dropdownButton: {
      justifyContent: 'space-between',
      alignItems: 'center',
      // width: wp(100),
      // height: wp(35),
      overflow: 'hidden',
      ...gutters.smallHPadding,
      //borderWidth: 1,
      backgroundColor: colors.white,
      borderRadius: wp(4),
      shadowColor: colors.black,
      borderColor: colors.primaryTextColor,
    },
    dropdownButtonText: {
      ...layout.fill,
      ...fonts.textTiny,
    },
    dropdownCustomizedButtonParent: {
      flex: 1,
      overflow: 'hidden',
    },
    //////////////////////////////////////
    dropdownOverlay: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dropdownOverlayView: {
      backgroundColor: colors.lightGrey,
    },
    dropdownActivityIndicatorView: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    //////////////////////////////////////
    dropdownRow: {
      flex: 1,
      minHeight: wp(30),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderBottomColor: colors.darkGrey,
      borderBottomWidth: 1,
      ...gutters.smallHPadding,
    },
    dropdownRowText: {
      ...layout.fill,
      ...fonts.textTiny,
    },
    dropdownCustomizedRowParent: {
      flex: 1,
      overflow: 'hidden',
    },
    //////////////////////////////////////
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },

    //// CUSTOM TEXTINPUT/SEARCH FIELD //////////////////////////////////
    label: {
      ...fonts.textTiny,
      ...layout.smallVMargin,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderBottomColor: colors.primaryTextColor,
      borderBottomWidth: 1,
      height: wp(34),
      width: '100%',
      ...fonts.textSmall,
      ...gutters.smallHPadding,
    },
    inputContainer: {
      borderColor: colors.primaryTextColor,
      height: wp(30),
      ...gutters.smallBMargin,
    },
    selectedElement: {
      backgroundColor: colors.darkGrey,
    },
    maxHeight: {
      maxHeight: wp(150),
    },
    loader: {
      right: wp(28),
    },
  });

export default getStyles;
