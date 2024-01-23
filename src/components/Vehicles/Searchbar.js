import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Item } from 'native-base';
import { useTheme } from '@/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Searchbar = () => {
  const { Common, Colors } = useTheme();
  const styles = getStyles(Colors);

  return (
    <View>
      <View style={Common.itemShadow}>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search"
          placeholderTextColor={Colors.grey}
          style={[]}
          onChangeText={text => console.log(text)}
          InputRightElement={
            <Icon
              as={Ionicons}
              name="ios-search"
              size={5}
              style={Common.searchIcon}
            />
          }
        />
        {/* <Input
          placeholder="Search vehicle"
          placeholderTextColor={Colors.grey}
          style={styles.searchInput}
        />
        <Icon style={styles.searchIcon} name="ios-search" as={Ionicons} /> */}
      </View>
    </View>
  );
};
const getStyles = Colors =>
  StyleSheet.create({
    searchInput: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    searchIcon: {
      marginRight: 10,
      color: Colors.appColor,
    },
  });
export default Searchbar;
