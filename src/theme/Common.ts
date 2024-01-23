/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native';
import buttonStyles from './components/Buttons';
import { CommonParams } from '../../@types/theme';
import { hp, wp } from '@/utils/layout-scaling';
import { Config } from '@/config';

export default function <C>({
  Colors,
  Gutters,
  Layout,
  ...args
}: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, Gutters, Layout, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      card: {
        borderRadius: wp(6),
        backgroundColor: Colors.white,
        shadowColor: Colors.primaryTextColor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: wp(3),
        elevation: 5,
        zIndex: 0,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
      customIconStyles: {
        height: 22,
        width: 22,
      },
      tabIconStyles: {
        height: 25,
        width: 25,
      },
      contentWrapper: {
        top: wp(-15),
      },
      contentWrapperDashboard: {
        top: wp(-25),
        ...Gutters.mediumHMargin,
      },
      itemShadow: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        elevation: 10,
        shadowColor: Colors.black,
      },
      marginBottom10: {
        marginBottom: 2,
      },

      // Search box style
      searchItem: {
        // marginLeft: wp(15),
        // marginRight: wp(15),
        // marginTop: -35,
        // marginBottom: 10,
      },
      searchInput: {
        //paddingLeft: 20,
        //paddingRight: 20,
        backgroundColor: Colors.white,
        borderRadius: 6,
      },
      searchIcon: {
        marginRight: 10,
        color: Colors.appColor,
      },

      // End - Search box style

      customButton: {
        textTransform: 'uppercase',
        color: Colors.white,
      },
      divider: {
        borderBottomWidth: wp(2),
        borderBottomColor: Colors.secondaryBackground,
        paddingVertical: hp(10),
      },
      wcagHeight: {
        minHeight: Config.ACCESSIBILIY_HEIGHT,
      },
      wcagWidth: {
        minWidth: Config.ACCESSIBILIY_WIDTH,
      },
      wcagArea: {
        minHeight: Config.ACCESSIBILIY_HEIGHT,
        minWidth: Config.ACCESSIBILIY_WIDTH,
      },

      wcagHeightAA: {
        minHeight: Config.ACCESSIBILIY_HEIGHT_AA,
      },
      wcagWidthAA: {
        minWidth: Config.ACCESSIBILIY_WIDTH_AA,
      },
      wcagAreaAA: {
        minHeight: Config.ACCESSIBILIY_HEIGHT_AA,
        minWidth: Config.ACCESSIBILIY_WIDTH_AA,
      },

      smallButton: {
        flex: 0.3,
        color: Colors.primaryTextColor,
        ...Layout.row,
        ...Layout.selfEnd,
        ...Gutters.mediumHPadding,
        ...Gutters.tinyVPadding,
        ...Gutters.mediumTMargin,
      },
    }),
  };
}
