import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Home = () => {
  return (
    <View>
      <Text>helo man</Text>
    </View>
  );
};

export default Home;

const getStyles = (Colors: any) =>
  StyleSheet.create({
    bgColors: {
      backgroundColor: Colors.white,
    },
    error: {
      color: Colors.strongRed,
    },
  });
