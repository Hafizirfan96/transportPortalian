import React from 'react';
import getStyles from './styles';
import { useTheme } from '@/hooks';
import useVehicleDetail from '@/hooks/useVehicleDetail';
import LorryList from '@/components/VehicleDetail/LorryList';
import { Header, VehicleDetailCard, SearchBox } from '@/components';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const VehicleDetailScreen = ({ route }: { route: any }) => {
  const { Fonts, Gutters, Layout, Colors } = useTheme();
  const styles = getStyles(Colors);

  const service = route.params;
  const tourVehicleId = route.params.TourVehicleId;

  const {
    lorryStart,
    lorryEnd,
    lorry,
    isLoading,
    onRefresh,
    handleNavigation,
    handleNavigationService,
    searchText,
    onSearchText,
  } = useVehicleDetail(tourVehicleId, service);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
      style={Layout.fill}
    >
      <View style={[styles.backgroundColor, Layout.fill]}>
        <Header title={route.params.RegistrationNumber} backPage="Vehicles" />
        <ScrollView style={[Layout.fill, styles.container]}>
          <VehicleDetailCard
            vehicleinfo={route.params}
            handleNavigation={handleNavigation}
            handleNavigationService={handleNavigationService}
          />
          <Text
            style={[
              Fonts.textRegularBold,
              Gutters.mediumHMargin,
              Gutters.smallTPadding,
            ]}
          >
            Select Lorry
          </Text>
          <View style={[Gutters.smallVMargin, Gutters.mediumTPadding]}>
            <SearchBox
              value={searchText}
              // searchRef={searchRef}
              // onPressSearch={onPressSearch}
              placeholder="Search Vehicle"
              onSearch={onSearchText}
              // isFlatListFocused={isFlatListFocused}
              // onFlatlistBlur={onFlatlistBlur}
              // handleBlur={handleBlur}
            />
          </View>
          <LorryList
            lorryStart={lorryStart}
            lorryEnd={lorryEnd}
            lorry={lorry}
            isLoading={isLoading}
            onRefresh={onRefresh}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
export default VehicleDetailScreen;
