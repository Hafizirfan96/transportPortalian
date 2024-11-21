import init from '@/store/startup/Init';
import StorageService from '@/services/StorageService';
import { clearUserData } from '@/store/auth';
import { Colors } from '@/theme/Variables';
import { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import React from 'react';
import useTheme from '@/hooks/useTheme';
import { useDispatch } from 'react-redux';

const IndexStartupContainer = () => {
  const { Layout, Gutters } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(clearUserData());
    // StorageService.clearAll();
    setTimeout(() => {
      dispatch(init.action());
    }, 100);
  }, [dispatch]);

  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} barStyle="light-content" />
      <View style={[Layout.fill, Layout.colCenter]}>
        <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      </View>
    </>
  );
};

export default IndexStartupContainer;
