import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks';

const Addproduct = () => {
  const { Images, Fonts, Layout } = useTheme();
  return (
    <View style={[Layout.row, { marginTop: 20 }]}>
      <Text style={[Fonts.titleSmall]}>Add Product</Text>
      <TouchableOpacity>
        <Image source={Images.fabButtonIcon} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
});
export default Addproduct;
