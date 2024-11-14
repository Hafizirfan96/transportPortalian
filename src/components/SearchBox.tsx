import { useTheme } from '@/hooks';
import React, { forwardRef } from 'react';
import { wp } from '@/utils/layout-scaling';
import Ionicons from 'react-native-vector-icons/AntDesign';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

interface IProps {
  placeholder: string;
  value: string;
  onSearch: (str: string) => void;
  padding?: boolean;
}

const SearchBox = forwardRef<View, IProps>(({
  placeholder = '',
  value = '',
  onSearch,
  padding,
}, ref) => {
  const { Layout, Common, Colors, Gutters, Fonts, darkMode } = useTheme();
  const styles = getStyles(Colors, Layout, Gutters, Fonts, darkMode);

  return (
    <View
      ref={ref}
      style={[
        styles.searchContainer,
        Common.card,
        !padding ? Gutters.mediumHMargin : null,
        Platform.OS === 'ios' ? Gutters.smallVPadding : Gutters.tinyVPadding,
        Common.contentWrapper,
      ]}
    >
      <Ionicons
        name={'search1'}
        size={wp(20)}
        color={Colors.primaryTextColor}
      />
      <TextInput
        style={styles.searchMessageInput}
        importantForAccessibility={'no'}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={Colors.lightBlack}
        underlineColorAndroid={'transparent'}
        autoCorrect={false}
        onChangeText={onSearch}
        blurOnSubmit={false}
      />
    </View>
  );
});

export default SearchBox;

export const getStyles = (
  colors: any,
  layout: any,
  gutters: any,
  fonts: any,
  darkmode: boolean,
) => {
  var styles = StyleSheet.create({
    searchContainer: {
      ...layout.row,
      ...layout.center,
      backgroundColor: darkmode ? colors.blackBackground : colors.white,
      ...gutters.smallLPadding,
      ...gutters.smallVPadding,
    },
    searchMessageInput: {
      ...fonts.textSmall,
      ...gutters.smallLPadding,
      ...layout.fill,
      height: Platform.OS === 'ios' ? wp(25) : wp(35),
      top: wp(2),
    },
  });

  return styles;
};
