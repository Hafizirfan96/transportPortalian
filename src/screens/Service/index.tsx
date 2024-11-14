import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/hooks';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import Header from '@/components/Header';
import useVehicleService from '@/hooks/useVehicleService';
import ServiceInfo from '@/components/Service/ServiceInfo';
import ServiceFilterInfo from '@/components/Service/ServiceFilterInfo';
import getStyles from '@/screens/Service/styles';
import { Text } from 'react-native';

const Service = ({ route }: { route: any }) => {
  const vehicle = route.params;

  const { Layout, Gutters, Colors } = useTheme();

  const {
    handleTypeToggle,
    typeId,
    control,
    vendorList,
    errors,
    handleSubmit,
    onServiceSubmit,
    isLoading,
    TourValid,
  } = useVehicleService(vehicle);

  const styles = getStyles(Colors);
  return (
    <CustomSafeArea>
      <Header title="Vehicle Service" backPage="VehicleInspection" />

      <View style={[Layout.row, Gutters.smallHMargin, Layout.center]}>
        <ServiceFilterInfo
          handleTypeToggle={handleTypeToggle}
          typeId={typeId}
          TourValid={TourValid}
        />
      </View>

      {TourValid && (
        <Text style={[Layout.textAlignmentCenter, styles.error]}>
          Please select at least one service
        </Text>
      )}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{}}>
          <ServiceInfo
            vendorList={vendorList}
            control={control}
            handleSubmit={handleSubmit}
            onServiceSubmit={onServiceSubmit}
            isLoading={isLoading}
            errors={errors}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </CustomSafeArea>
  );
};
export default Service;
