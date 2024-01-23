import React, { useEffect } from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { useTheme } from '@/hooks';
import { useDispatch } from 'react-redux';
import init from '@/store/startup/Init';
import StorageService from '@/services/StorageService';
import { clearUserData } from '@/store/auth';
import { Colors } from '@/theme/Variables';

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
