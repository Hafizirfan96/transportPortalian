import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import getStyles from './styles';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import Header from '@/components/Header';
import { Config } from '@/config';
import ToggleButton from '@/components/ToggleButton';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/Input/Input';
import DateTimePickers from '@/components/DateTime';
import {
  vehiclesService,
  vendorLists,
} from '@/store/vehicleService/vehicleService';
import { vehicleServiceSelector } from '@/store/vehicleService';
import ToastMessage from '@/components/Toast';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

const Service = ({ route }) => {
  const vehicle = route.params;

  const { Layout, Common, Colors, Gutters } = useTheme();
  const [typeId, settypeId] = useState(null);
  const dispatch = useAppDispatch();
  const { isLoading: isLoading, vendorList } = useAppSelector(
    vehicleServiceSelector,
  );
  useEffect(() => {
    dispatch(vendorLists());
  }, []);

  const styles = getStyles(Colors);
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error Message',
      text2: 'Please select type',
    });
  };
  const handleTypeToggle = (value: number) => {
    settypeId(value);
  };

  const _renderFilterType = () => {
    return (
      <View style={[Layout.row, Layout.fill, styles.ItemWrapper]}>
        {Config.FILTER_SERVICE.map(item => {
          return (
            <ToggleButton
              key={item.Id}
              onPress={() => handleTypeToggle(item.Id)}
              value={item.Id}
              text={item.Title}
              checked={item.Id === typeId}
              style={styles.togglebutton}
            />
          );
        })}
      </View>
    );
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onServiceSubmit = async (data: any) => {
    if (typeId > 0) {
      const payload = {
        Id: 0,
        GuId: '',
        ServiceDate: data.date,
        VendorId: data.VendorId,
        TypeId: typeId,
        VehicleId: vehicle.VehicleId,
        Km: data.Kilometre,
        Description: data.Description,
        Price: data.Price,
        Tags: data.Tags,
        KmForNextService: data.KMForNextService,
        NextServiceDate: data.nextserviceDate,
      };
      dispatch(vehiclesService(payload));
    }
    showToast();
  };
  return (
    <CustomSafeArea>
      <ToastMessage />

      <Header title="Vehicle Service" backPage="VehicleInspection" />

      <View style={[Layout.row, Gutters.regularHMargin, Layout.center]}>
        {_renderFilterType()}
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{}}>
          <View style={[styles.alignCenter]}>
            <View>
              <Text style={[styles.dates]}>Vendor</Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.textContainer]}>
                    <Picker
                      mode="dropdown"
                      selectedValue={value}
                      onValueChange={(itemValue, itemIndex) => {
                        onChange(itemValue);
                      }}
                      dropdownIconColor={Colors.white}
                      dropdownIconRippleColor={Colors.white}
                    >
                      <Picker.Item key={0} label={'Select vendor'} value={''} />
                      {vendorList?.map(item => (
                        <Picker.Item
                          key={item.Id}
                          label={item.Text}
                          value={item.Id}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
                name="VendorId"
                rules={{
                  required: {
                    value: true,
                    message: 'VendorId is required field.',
                  },
                }}
              />
            </View>
            <View style={[styles.errorView]}>
              {errors.VendorId && (
                <Text style={styles.error}>{errors?.VendorId?.message}</Text>
              )}
            </View>
            <View>
              <Text style={[styles.dates]}>Date</Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <DateTimePickers
                      label="Date"
                      value={value ? new Date(value) : null}
                      handleDatePicked={onChange}
                    />
                  </View>
                )}
                name="date"
                rules={{
                  required: {
                    value: true,
                    message: 'date is required field.',
                  },
                }}
              />
            </View>
            <View style={[styles.errorView]}>
              {errors.date && (
                <Text style={styles.error}>{errors?.date?.message}</Text>
              )}
            </View>
            <View style={[styles.date]}>
              <Text style={[styles.input]}>Kilometre</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Kilometre"
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="Kilometre"
                rules={{
                  required: {
                    value: true,
                    message: 'Kilometre is required field.',
                  },
                }}
                defaultValue=""
              />
            </View>
            <View style={[styles.errorView]}>
              {errors.Kilometre && (
                <Text style={styles.error}>{errors?.Kilometre?.message}</Text>
              )}
            </View>
            <View style={[styles.date]}>
              <Text style={[styles.input]}>Description</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Description"
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="Description"
                rules={{
                  required: {
                    value: true,
                    message: 'Description is required field.',
                  },
                }}
                defaultValue=""
              />
            </View>
            <View style={[styles.errorView]}>
              {errors.Description && (
                <Text style={styles.error}>{errors?.Description?.message}</Text>
              )}
            </View>
            <View style={[styles.date]}>
              <Text style={[styles.input]}>Price</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Price"
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="Price"
                rules={{
                  required: {
                    value: true,
                    message: 'Price is required field.',
                  },
                }}
                defaultValue=""
              />
            </View>
            <View style={[styles.errorView]}>
              {errors.Price && (
                <Text style={styles.error}>{errors?.Price?.message}</Text>
              )}
            </View>
            <View style={[styles.date]}>
              <Text style={[styles.input]}>Tags</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Tags"
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="Tags"
                rules={{
                  required: {
                    value: true,
                    message: 'Tags is required field.',
                  },
                }}
                defaultValue=""
              />
            </View>
            <View style={[styles.errorView]}>
              {errors.Tags && (
                <Text style={styles.error}>{errors?.Tags?.message}</Text>
              )}
            </View>
            <View style={[styles.date]}>
              <Text style={[styles.input]}>KM For Next Service</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="KM For Next Service"
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="KMForNextService"
                rules={{
                  required: {
                    value: true,
                    message: 'KM For Next Service is required field.',
                  },
                }}
                defaultValue=""
              />
            </View>
            <View style={[styles.errorView]}>
              {errors.KMForNextService && (
                <Text style={styles.error}>
                  {errors?.KMForNextService?.message}
                </Text>
              )}
            </View>
            <View>
              <Text style={[styles.dates]}>Date for next service</Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <DateTimePickers
                      label="Date for next service"
                      value={value}
                      handleDatePicked={onChange}
                    />
                  </View>
                )}
                name="nextserviceDate"
              />
            </View>
            <View style={[styles.errorView]}>
              {errors.Datefornextservice && (
                <Text style={styles.error}>
                  {errors?.Datefornextservice?.message}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit(onServiceSubmit)}
              style={[Common.button.fullRounded, Gutters.mediumTMargin]}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.white}
                  style={Common.button.buttonText}
                />
              ) : (
                <Text style={Common.button.buttonText}>SUBMIT</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </CustomSafeArea>
  );
};
export default Service;
