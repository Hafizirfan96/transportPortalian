/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native';
import buttonStyles from './components/Buttons';
import { CommonParams } from '../../@types/theme';
import { hp, wp } from '@/utils/layout-scaling';
import { Config } from '@/Config';

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
        borderRadius: wp(5),
        backgroundColor: Colors.white,
        shadowColor: Colors.primaryTextColor,
        shadowOffset: { width: wp(1), height: wp(1) },
        shadowOpacity: wp(0.5),
        shadowRadius: wp(3),
        elevation: wp(5),
        zIndex: wp(0),
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
        top: wp(-22),
      },
      contentWrapperDashboard: {
        top: wp(-32),
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
      gapProperity: {
        gap: wp(-12),
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
        minHeight: wp(Config.ACCESSIBILIY_HEIGHT),
        minWidth: wp(Config.ACCESSIBILIY_WIDTH),
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
