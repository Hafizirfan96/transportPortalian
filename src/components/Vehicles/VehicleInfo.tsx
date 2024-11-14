import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import VehicleCard from './VehicleCard';
import { useTheme } from '@/hooks';
import EmptyList from '../EmptyList';
import { wp } from '@/utils/layout-scaling';

const VehicleInfoComponent = ({
  handleNavigation,
  vehicleStart,
  vehicleEnd,
  vehicle,
  isLoading,
  onRefresh,
  isUpdating,
  selectedIndex,
}: {
  handleNavigation: any;
  vehicleStart: any;
  vehicleEnd: any;
  vehicle: any;
  isLoading: boolean;
  onRefresh: any;
  isUpdating: boolean;
  selectedIndex: number;
}) => {
  const { Layout } = useTheme();

  const renderItem = ({ item, index }: { item: any; index: any }) => {
    return (
      <VehicleCard
        key={index}
        isUpdating={selectedIndex == index && isUpdating}
        vehicle={item}
        index={index}
        handleNavigation={handleNavigation}
        vehicleStart={vehicleStart}
        vehicleEnd={vehicleEnd}
      />
    );
  };

  return (
    <FlatList
      data={vehicle}
      contentContainerStyle={[Layout.flexGrow, styles.flatListContent]}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        !isLoading && <EmptyList text="No vehicle is available." />
      }
      ListFooterComponent={<View style={styles.footerComponent} />}
      keyboardShouldPersistTaps="handled"
      removeClippedSubviews={false}
    />
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: wp(130),
  },
  footerComponent: {
    height: wp(40),
  },
});

export default VehicleInfoComponent;
