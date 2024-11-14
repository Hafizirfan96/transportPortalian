import React from 'react';
import { useTheme } from '@/hooks';
import { ActivityIndicator } from 'react-native';

const PageLoader = () => {
  const { Colors } = useTheme();

  return <ActivityIndicator size={60} color={Colors.appColor} />;
};

export default PageLoader;
