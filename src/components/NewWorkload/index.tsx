import React from 'react';
import { useTheme } from '@/hooks';
import SubTitle from '../SubTitle';
import DateTimePicker from '../DateTime';
import { Picker } from '@react-native-picker/picker';
import getStyles from '@/screens/NewWorkload/styles';
import { Controller, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import Autocomplete from 'react-native-autocomplete-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdownWithSearch from '../SelectDropdownWithSearch';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const NewWorkloadComponent = ({
  address,
  setaddress,
  control,
  isLoading,
  tour,
  setTour,
  projects,
  WORKLOAD_TYPE,
  defaultStartDate,
  defaultFinishDate,
  errors,
  handleSubmit,
  onSaveClick,
  locations,
}: {
  address: any;
  setaddress: any;
  control: any;
  isLoading: boolean;
  tour: any;
  setTour: any;
  projects: any;
  WORKLOAD_TYPE: any;
  defaultStartDate: Date;
  defaultFinishDate: Date;
  errors: any;
  handleSubmit: Function;
  onSaveClick: Function;
  locations: any;
}) => {
  const { Layout, Colors, Common, Gutters } = useTheme();
  const styles = getStyles(Colors);
  const { clearErrors } = useForm();

  return (
    <View style={[Gutters.mediumHPadding]}>
      <View style={[Gutters.smallTMargin]}>
        <SubTitle text="Workload Location" />
      </View>
      <Controller
        control={control}
        name="workloadLocation"
        defaultValue={address.place}
        rules={{
          required: 'Workload Location is required field.',
        }}
        render={({ field: { onChange, value } }) => (
          <View style={[styles.textContainer, Layout.row, Gutters.tinyTMargin]}>
            <Autocomplete
              inputContainerStyle={[styles.borderColor, Gutters.smallLPadding]}
              style={[styles.autoComplete]}
              data={locations ?? [{ Name: 'Loading...' }]}
              value={value}
              placeholder="Workload Location"
              onChangeText={text => {
                setaddress({
                  place: text,
                  isCompleted: text.length >= 2 ? false : true,
                });
                clearErrors('workloadLocation');
                onChange(text);
              }}
              flatListProps={{
                keyExtractor: index => index.toString(),
                renderItem: ({ item }: any) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onChange(item.Name);
                        setaddress({
                          place: item.Name,
                          isCompleted: true,
                        });
                        clearErrors('workloadLocation');
                      }}
                    >
                      <Text style={[styles.itemText]}>{item.Name}</Text>
                    </TouchableOpacity>
                  );
                },
                style: {
                  borderBottomWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                },
              }}
              hideResults={value.length < 2 || address.isCompleted}
              renderTextInput={props => (
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                  <TextInput
                    {...props}
                    style={[Layout.fill, styles.autoComplete]}
                    clearButtonMode="while-editing"
                  />
                  {value.length > 0 && (
                    <TouchableOpacity onPress={() => onChange('')}>
                      <Icon name="close" size={15} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
            <View style={[Gutters.smallTMargin, Gutters.smallRPadding]}>
              {isLoading && (
                <ActivityIndicator
                  size="small"
                  style={[Layout.absolute, styles.right]}
                />
              )}
            </View>
          </View>
        )}
      />
      <View style={[styles.errorView, Gutters.regularTMargin]}>
        {errors.workloadLocation && (
          <Text style={[styles.error]}>{errors.workloadLocation.message}</Text>
        )}
      </View>
      <SubTitle text="Tour Related" />
      <View style={[Gutters.tinyTMargin, Gutters.mediumBMargin]}>
        <Controller
          control={control}
          render={() => (
            <View style={[styles.pickerContainer]}>
              <Picker
                selectedValue={tour || projects[0]}
                onValueChange={itemValue => setTour(itemValue)}
                dropdownIconColor={Colors.white}
                dropdownIconRippleColor={Colors.white}
              >
                <Picker.Item label="Select a product" value="" />
                {projects.length > 0 &&
                  projects?.map((item: any, index: any) => {
                    return (
                      <Picker.Item key={index} label={item.Name} value={item} />
                    );
                  })}
              </Picker>
            </View>
          )}
          name="tourId"
        />
      </View>
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <View
            style={[
              styles.textContainer,
              Gutters.smallLPadding,
              Gutters.regularVPadding,
              Gutters.regularBMargin,
            ]}
          >
            <SelectDropdownWithSearch
              data={WORKLOAD_TYPE}
              defaultValueByIndex={0}
              defaultButtonText={'Select workload type'}
              dropdownIconPosition={'right'}
              onSelect={(selectedItem: any) => {
                onChange(selectedItem.value);
              }}
              isItemSelected={() => {
                return true;
              }}
              onSearch={() => {}}
              buttonTextAfterSelection={(selectedItem: any) => {
                return selectedItem.Name;
              }}
              rowTextForSelection={(item: any) => {
                return item.Name;
              }}
              renderDropdownIcon={(isOpened: any) => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={Colors.primaryTextColor}
                    size={18}
                  />
                );
              }}
            />
          </View>
        )}
        name="Project"
        defaultValue="0"
      />

      <SubTitle text="Ready" />
      <View style={[Gutters.tinyTMargin]}>
        <Controller
          defaultValue={defaultStartDate}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              label="Date/Time"
              value={value}
              handleDatePicked={onChange}
            />
          )}
          name="readydate"
          rules={{
            required: {
              value: true,
              message: 'Ready date date is required field.',
            },
          }}
        />
      </View>
      <View style={[styles.errorView]}>
        {errors.readydate && (
          <Text style={[styles.errors]}>
            {errors?.readydate?.message?.toString()}
          </Text>
        )}
      </View>
      <View style={[Gutters.regularTMargin]}>
        <SubTitle text="Finish" />
      </View>
      <View style={[Gutters.tinyTMargin]}>
        <Controller
          defaultValue={defaultFinishDate}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              label="Date/Time"
              value={value}
              handleDatePicked={onChange}
            />
          )}
          name="finishdate"
          rules={{
            required: {
              value: true,
              message: 'Finish date is required field.',
            },
          }}
        />
      </View>
      <View style={[styles.errorView]}>
        {errors.finishdate && (
          <Text style={[styles.errors]}>
            {errors?.finishdate?.message?.toString()}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={handleSubmit(onSaveClick)}
        style={[Common.button.btnRegularRounded, Gutters.mediumVMargin]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={Common.button.buttonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NewWorkloadComponent;
