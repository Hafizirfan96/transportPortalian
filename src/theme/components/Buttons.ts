import { StyleSheet } from 'react-native';
import { CommonParams } from '../../../@types/theme';
import { wp } from '@/utils/layout-scaling';

export default function <C>({
  Fonts,
  Colors,
  Gutters,
  Layout,
}: CommonParams<C>) {
  const base = {
    ...Layout.center,
    ...Gutters.mediumHPadding,
    ...Gutters.tinyVPadding,
    backgroundColor: Colors.primaryBackground,
  };
  const rounded = {
    ...base,
    borderRadius: 60,
  };
  const smallrounded = {
    ...base,
    borderRadius: 7,
  };

  return StyleSheet.create({
    base,
    rounded,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primaryTextColor,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primaryTextColor,
    },
    fullRounded: {
      ...rounded,
      backgroundColor: Colors.primaryBackground,
      // borderWidth: 2,
      borderColor: Colors.secondaryBackground,
      // width: '100%',
    },
    btnSmall: {
      //backgroundColor: Colors.darkGreen,
      //borderWidth: 1,
      //borderColor: Colors.secondaryBackground,
      minWidth: 120,
      height: 15,
    },
    btnSmallRounded: {
      ...rounded,
      //backgroundColor: Colors.darkGreen,
      // borderWidth: 1,
      borderColor: Colors.secondaryBackground,
      minWidth: 120,
      height: 35,
    },
    btnRegularRounded: {
      ...smallrounded,
      borderColor: Colors.secondaryBackground,
      minWidth: 120,
    },
    btnTinyRounded: {
      ...rounded,
      //backgroundColor: Colors.darkGreen,
      borderWidth: 1,
      borderColor: Colors.secondaryBackground,
      minWidth: 80,
      height: 30,
    },
    buttonText: {
      ...Fonts.boldFontFamily,
      color: Colors.black,
      fontSize: wp(14),
      marginVertical: wp(2),
    },
    btnNormalSmall: {
      ...base,
      borderRadius: 6,
      backgroundColor: Colors.primaryBackground,
      borderWidth: 2,
      borderColor: Colors.appColor,
    },
    btnFilterSmall: {
      borderRadius: 8,
      backgroundColor: Colors.white,
      borderWidth: 2,
      borderColor: Colors.primaryBackground,
      paddingHorizontal: 5,
      paddingVertical: 0,
      height: 35,
    },
    filterButtonText: {
      //fontSize: 15,
      ...Fonts.textSmall,
    },
    filterButtonIcon: {
      fontSize: 18,
      marginRight: 5,
      color: Colors.primaryTextColor,
      marginLeft: 0,
    },
    rotate90Deg: {
      transform: [{ rotate: '90deg' }],
    },

    btnWhiteSmall: {
      borderRadius: wp(5),
      backgroundColor: Colors.white,
      borderWidth: wp(0),
      borderColor: Colors.primaryTextColor,
      paddingHorizontal: wp(10),
      paddingVertical: wp(5),
      minHeight: wp(38),
      minWidth: wp(70),
      alignText: 'center',
    },
  });
}
