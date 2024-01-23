import React, { useRef, useState } from 'react';
import { useTheme } from '@/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { debounce } from '@/utils';
import { wp } from '@/utils/layout-scaling';

const SearchBox = ({ placeholder = '', onSearch }) => {
  const { Layout, Common, Colors, Gutters, Fonts, darkMode } = useTheme();
  const styles = getStyles(Colors, Layout, Gutters, Fonts, darkMode);
  const [searchText, setSearchText] = useState('');
  const ref = useRef();

  const [isFocused, setIsFocused] = useState(false);
  const _searchHandler = (input: any) => {
    onSearch(input);
    setSearchText(input);
  };

  const _setFocus = () => {
    setIsFocused(!isFocused);
  };
  return (
    <TouchableWithoutFeedback onPress={() => ref.current?.focus()}>
      <View
        style={[
          styles.searchContainer,
          Common.card,
          Gutters.mediumHMargin,
          Platform.OS == 'ios' ? Gutters.smallVPadding : Gutters.tinyVPadding,
        ]}
      >
        <Ionicons
          name="ios-search"
          size={wp(20)}
          color={Colors.primaryTextColor}
        />
        <TextInput
          style={styles.searchMessageInput}
          importantForAccessibility={'no'}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeHolderColor}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          onChangeText={debounce(
            (text: string) => _searchHandler(text),
            1000,
            null,
          )}
          ref={ref}
          blurOnSubmit={false}
          onFocus={_setFocus}
          onBlur={_setFocus}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

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
      height: Platform.OS == 'ios' ? wp(25) : wp(35),
      top: wp(2),
    },
  });

  return styles;
};
