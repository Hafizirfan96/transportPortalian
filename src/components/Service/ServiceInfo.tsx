import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Controller } from 'react-hook-form';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickers from '@/components/DateTime';
import Input from '@/components/Input/Input';
import { useTheme } from '@/hooks';
import getStyles from '@/screens/Service/styles';
import { wp } from '@/utils/layout-scaling';
import AppButton from '../AppButton';

const ServiceInfo = ({
  vendorList,
  control,
  handleSubmit,
  onServiceSubmit,
  isLoading,
  errors,
}: {
  vendorList: any;
  control: any;
  handleSubmit: any;
  onServiceSubmit: any;
  isLoading: any;
  errors: any;
}) => {
  const { Common, Colors, Gutters, Fonts } = useTheme();

  const styles = getStyles(Colors);

  return (
    <View style={[styles.alignCenter]}>
      <View>
        <Text style={[styles.dates]}>Vendor</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <View style={[styles.textContainer]}>
                <Picker
                  mode="dropdown"
                  selectedValue={value}
                  onValueChange={(itemValue, itemIndex) => {
                    onChange(itemValue);
                  }}
                  style={styles.dropdown}
                  selectionColor={Colors.black}
                  dropdownIconColor={Colors.white}
                  dropdownIconRippleColor={Colors.white}
                >
                  <Picker.Item
                    key={0}
                    style={[styles.pickerItem]}
                    label={'Select vendor'}
                    value={''}
                  />
                  {vendorList?.map((item: any) => (
                    <Picker.Item
                      style={[styles.pickerItem, { paddingBottom: 5 }]}
                      key={item.Id}
                      label={item.Text}
                      value={item.Id}
                    />
                  ))}
                </Picker>
              </View>
              <View style={[styles.errorView]}>
                {errors.VendorId && (
                  <Text style={styles.error}>
                    {errors?.VendorId?.message?.toString()}
                  </Text>
                )}
              </View>
            </>
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

      <View style={{ bottom: wp(2) }}>
        <Text style={[styles.dates]}>Date</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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
          <Text style={styles.error}>{errors?.date?.message?.toString()}</Text>
        )}
      </View>
      <View style={[styles.box]}>
        <Text style={[styles.dates]}>Kilometre</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Kilometre"
              onChangeText={value => onChange(value)}
              value={value}
              onBlur={onBlur}
              outerStyle={[Gutters.tinyTMargin]}
              keyboardType={'number-pad'}
              validationComponent={
                <View style={[styles.errorView]}>
                  {errors.Kilometre && (
                    <Text style={styles.error}>
                      {errors?.Kilometre?.message?.toString()}
                    </Text>
                  )}
                </View>
              }
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

      <View style={[Gutters.tinyTMargin]}>
        <Text style={[styles.dates]}>Description</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Description"
              onChangeText={value => onChange(value)}
              value={value}
              onBlur={onBlur}
              keyboardType={undefined}
              style={[styles.description, Fonts.textSmall]}
              placeholderTextColor={Colors.placeHolderColor}
              multiline
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
        {errors.Description && (
          <View style={[styles.errorView, Gutters.tinyTMargin]}>
            <Text style={styles.error}>
              {errors?.Description?.message?.toString()}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.box]}>
        <Text style={[styles.dates]}>Price</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Price"
              onChangeText={value => onChange(value)}
              value={value}
              onBlur={onBlur}
              keyboardType={'number-pad'}
              outerStyle={[Gutters.tinyTMargin]}
              validationComponent={
                <View style={[styles.errorView]}>
                  {errors.Price && (
                    <Text style={styles.error}>
                      {errors?.Price?.message?.toString()}
                    </Text>
                  )}
                </View>
              }
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

      <View style={[styles.box]}>
        <Text style={[styles.dates]}>Tags</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Tags"
              onChangeText={value => onChange(value)}
              value={value}
              onBlur={onBlur}
              keyboardType={undefined}
              outerStyle={[Gutters.tinyTMargin]}
              validationComponent={
                <View style={[styles.errorView]}>
                  {errors.Tags && (
                    <Text style={styles.error}>
                      {errors?.Tags?.message?.toString()}
                    </Text>
                  )}
                </View>
              }
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

      <View style={[styles.box]}>
        <Text style={[styles.dates]}>KM For Next Service</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="KM For Next Service"
              onChangeText={value => onChange(value)}
              value={value}
              onBlur={onBlur}
              keyboardType={'number-pad'}
              outerStyle={[Gutters.tinyTMargin]}
              validationComponent={
                <View style={[styles.errorView]}>
                  {errors.KMForNextService && (
                    <Text style={styles.error}>
                      {errors?.KMForNextService?.message?.toString()}
                    </Text>
                  )}
                </View>
              }
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

      <View style={[styles.box]}>
        <Text style={[styles.dates]}>Date for next service</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
              <DateTimePickers
                label="Date for next service"
                value={value}
                handleDatePicked={onChange}
                ContainerStyle={{ width: '100%' }}
              />
            </View>
          )}
          name="nextserviceDate"
          rules={{
            required: {
              value: true,
              message: 'Date for next service is required field.',
            },
          }}
        />
        <View style={[styles.errorView, Gutters.tinyTMargin]}>
          <Text style={styles.error}>
            {errors?.nextserviceDate?.message?.toString()}
          </Text>
        </View>
      </View>
      <View style={[Gutters.mediumVMargin]}>
        <AppButton
          title="SUBMIT"
          isLoading={isLoading}
          handleSubmit={handleSubmit(onServiceSubmit)}
        />
      </View>
    </View>
  );
};

export default ServiceInfo;
