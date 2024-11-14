import React from 'react';
import getStyles from './style';
import TourItem from '@/components/Tours/TourItem';
import { Header, VehicleCard } from '@/components';
import { KillometerUpdate } from '@/components/Vehicles';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { FlatList, RefreshControl, View, Text } from 'react-native';
import ScheduleInfoComponent from '@/components/Dashboard/ScheduleInfo';
import {
  useDashboardInfo,
  useTheme,
  useTourInfo,
  useVehicleInfo,
} from '@/hooks';

const DashboardScreen = () => {
  const { Colors, Fonts, Gutters } = useTheme();
  const styles = getStyles(Colors, Fonts);

  const {
    scheduleInfo,
    shiftInfo,
    isLoading,
    startShifts,
    endShifts,
    onRefresh,
    isLocationLoading,
    localLoading,
  } = useDashboardInfo();
  const {
    tour,
    startTours,
    endTours,
    setCardselect,
    cardSelect,
    isUpdating,
    isShiftStarted,
  } = useTourInfo();
  const {
    vehicle,
    handleNavigation,
    vehicleStart,
    vehicleEnd,
    isUpdating: loader,
    iskmModalVisible,
    km,
    onCancelkmModel,
    onChangeKm,
    onSubmitkmModal,
  } = useVehicleInfo();
  return (
    <CustomSafeArea>
      <View style={[styles.container]}>
        <FlatList
          data={[{}]}
          refreshControl={
            <RefreshControl
              refreshing={localLoading}
              onRefresh={onRefresh}
              colors={[Colors.primaryBackground]}
            />
          }
          ListHeaderComponent={<Header title="Dashboard" />}
          contentContainerStyle={[styles.container]}
          renderItem={() => {
            return (
              <ScheduleInfoComponent
                scheduleInfo={scheduleInfo}
                isShiftStarted={shiftInfo !== null}
                shiftInfo={shiftInfo}
                isLoading={isLoading || isLocationLoading}
                startShifts={startShifts}
                endShifts={endShifts}
              />
            );
          }}
          ListFooterComponent={
            <View style={[styles.tourContainer]}>
              {tour.length > 0 && (
                <View>
                  <View style={[Gutters.mediumHMargin, Gutters.tinyBMargin]}>
                    <Text style={[Fonts.textSmallBold]}>Tour</Text>
                  </View>
                  <TourItem
                    tour={tour[0]}
                    onStart={startTours}
                    endtour={endTours}
                    setCardselect={setCardselect}
                    cardSelect={cardSelect}
                    isUpdating={isUpdating}
                    isShiftStarted={isShiftStarted}
                  />
                  </View>
              )}
              {vehicle.length > 0 && (
                <View>
                  <View
                    style={[
                      Gutters.mediumHMargin,
                      Gutters.tinyBMargin,
                      Gutters.smallTMargin,
                    ]}
                  >
                    <Text style={[Fonts.textSmallBold]}>Vehicle</Text>
                  </View>
                  <VehicleCard
                    key={0}
                    vehicle={vehicle[0]}
                    isUpdating={loader}
                    vehicleStart={vehicleStart}
                    vehicleEnd={vehicleEnd}
                    handleNavigation={handleNavigation}
                    index={0}
                  />
                </View>
              )}
            </View>
          }
        />
        <KillometerUpdate
          visible={iskmModalVisible}
          submitDisabled={km === ''}
          kilometers={vehicle[0]?.LastKm}
          handleKilometresChange={onChangeKm}
          onSubmit={onSubmitkmModal}
          onCancel={onCancelkmModel}
        />
      </View>
    </CustomSafeArea>
  );
};

export default DashboardScreen;
