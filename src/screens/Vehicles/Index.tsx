import React, { useEffect } from 'react';
import { useTheme } from '@/hooks';
import { View } from 'react-native';
import { Header, SearchBox } from '@/components';
import useVehicleInfo from '../../hooks/useVehicleInfo';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import VehicleInfoComponent from '@/components/Vehicles/VehicleInfo';
import { KillometerUpdate } from '@/components/Vehicles';

const VehiclesScreen = () => {
  const {
    vehicle,
    isLoading,
    handleNavigation,
    searchText,
    onSearchVehicle,
    vehicleStart,
    vehicleEnd,
    onRefresh,
    isUpdating,
    selectedIndex,
    onCancelkmModel,
    onSubmitkmModal,
    iskmModalVisible,
    onChangeKm,
    km,
  } = useVehicleInfo();

  const { Layout, Colors, Common } = useTheme();

  return (
    <>
      <KillometerUpdate
        visible={iskmModalVisible}
        submitDisabled={km === ''}
        kilometers={km}
        handleKilometresChange={onChangeKm}
        onSubmit={onSubmitkmModal}
        onCancel={onCancelkmModel}
      />
      <CustomSafeArea>
        <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
          <Header title="Vehicle" />
          <View style={[Common.gapProperity]}>
            <SearchBox
              placeholder="Search vehicles"
              value={searchText}
              onSearch={onSearchVehicle}
            />

            <VehicleInfoComponent
              handleNavigation={handleNavigation}
              vehicleStart={vehicleStart}
              vehicleEnd={vehicleEnd}
              vehicle={vehicle}
              isLoading={isLoading}
              onRefresh={onRefresh}
              isUpdating={isUpdating}
              selectedIndex={selectedIndex}
            />
          </View>
        </View>
      </CustomSafeArea>
    </>
  );
};

export default VehiclesScreen;
