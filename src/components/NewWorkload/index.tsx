import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import getStyles from './styles';
import SelectDropdownWithSearch from '../SelectDropdownWithSearch';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '../DateTime';
import {
  newWorkload,
  createNewWorkloads,
} from '@/store/newWorkload/newWorklod';
import { newWorkloadSelector } from '@/store/newWorkload';
import Autocomplete from 'react-native-autocomplete-input';
import { tourSelector } from '@/store/tour';
import { Picker } from '@react-native-picker/picker';
import { Config } from '@/config';
import { setformValue } from '@/store/newWorkload/formState';
import { useSelector } from 'react-redux';

const NewWorkloadComponent = (props: any) => {
  const { Layout, Colors, Common, FontSize, Gutters } = useTheme();
  const styles = getStyles(Colors, FontSize);
  const dispatch = useAppDispatch();
  const { newWorkloadyData, isLoading } = useAppSelector(newWorkloadSelector);
  const { tourData: projects } = useAppSelector(tourSelector);
  const WORKLOAD_TYPE = Config.WORKLOAD_TYPE;
  var statusNew = Config.WORKLOAD_STATUS.NEW;
  const defaultTour = projects?.length ? projects[0] : null;
  console.log('props in new-----', props);
  const [address, setaddress] = useState({
    place: '',
    isCompleted: false,
  });
  const [locations, setLocations] = useState([]);
  const [tour, setTour] = useState(defaultTour);
  const value = useSelector(state => state.formVal.formValue);
  console.log('value-----', value);

  useEffect(() => {
    if (address.isCompleted || address.place.length < 2) return;
    const payload = address.place;
    dispatch(newWorkload(payload));
    if (newWorkloadyData) setLocations(newWorkloadyData);
  }, [address.place]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSaveClick = (data: any) => {
    const payload = {
      ProjectId: tour?.ProjectId ? tour?.ProjectId : null,
      CustomerId: tour?.CustomerId ? tour?.CustomerId : null,
      status: statusNew,
      Type: data.Project,
      ReadyFrom: data.readydate,
      Deadline: data.finishdate,
    };

    if (data.Project === 'Pickup') {
      payload.SenderAddress = address.place;
    } else {
      payload.ReceiverAddress = address.place;
    }
    var KolliDetail = 0;
    if ((KolliDetail = 0)) {
      console.log('if-----');
      Alert.alert('Alert Title', 'My Alert Msg');
    } else {
      console.log('else------');
      Alert.alert('Alert Message', 'please add one shipment ');
    }
    dispatch(setformValue(payload));
    // dispatch(createNewWorkloads(payload));
  };

  return (
    <ScrollView style={styles.authWrapper} onPress={Keyboard.dismiss}>
      <View style={[styles.container]}>
        <Text style={[styles.textStyle]}>Workload Location</Text>
        <View
          style={[
            styles.textContainer,
            Layout.row,
            Layout.center,
            Gutters.smallLPadding,
            Gutters.smallVPadding,
          ]}
        >
          <Autocomplete
            inputContainerStyle={{ borderColor: Colors.white }}
            style={styles.autoComplete}
            data={locations}
            value={address.place}
            placeholder="Workload Location"
            onChangeText={text => {
              setaddress({
                place: text,
                isCompleted: false,
              });
            }}
            flatListProps={{
              keyExtractor: idx => idx,
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    setaddress({
                      place: item?.Name,
                      isCompleted: true,
                    })
                  }
                >
                  <Text style={styles.itemText}>{item?.Name}</Text>
                </TouchableOpacity>
              ),
            }}
            hideResults={address.isCompleted}
            listContainerStyle={styles.listContainer}
          />
        </View>
        <Text style={[styles.textStyle, Gutters.smallTMargin]}>
          Tour Related
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Picker
                style={styles.dropdown}
                selectedValue={tour}
                onValueChange={itemValue => setTour(itemValue)}
                dropdownIconColor={Colors.white}
                dropdownIconRippleColor={Colors.white}
              >
                <Picker.Item label="Select a product" value="" />
                {projects?.map((item: any, index: any) => {
                  return (
                    <Picker.Item key={index} label={item.Name} value={item} />
                  );
                })}
              </Picker>
            </View>
          )}
          name="tourId"
          // defaultValue={value.tourId}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={[
                styles.textContainer,
                Gutters.smallLPadding,
                Gutters.smallVPadding,
                Gutters.mediumBMargin,
              ]}
            >
              <SelectDropdownWithSearch
                data={WORKLOAD_TYPE}
                defaultButtonText={'Select workload type'}
                dropdownIconPosition={'right'}
                onSelect={(selectedItem, index) => {
                  onChange(selectedItem.value);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.Name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.Name;
                }}
                renderDropdownIcon={isOpened => {
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
          rules={{
            required: {
              value: true,
              message: 'Project is required field.',
            },
          }}
          defaultValue={value.Project}
        />
        <View style={[styles.errorView]}>
          {errors.Project && (
            <Text style={styles.error}>{errors?.Project?.message}</Text>
          )}
        </View>
        <Text style={[styles.textStyle]}>Ready</Text>
        <Controller
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
          defaultValue={value.readydate}
        />
        <View style={[styles.errorView]}>
          {errors.readydate && (
            <Text style={styles.errors}>{errors?.readydate?.message}</Text>
          )}
        </View>
        <Text style={[styles.textStyle, Gutters.regularTMargin]}>Finish</Text>
        <Controller
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
        <View style={[styles.errorView]}>
          {errors.finishdate && (
            <Text style={styles.errors}>{errors?.finishdate?.message}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSaveClick)}
          style={[
            Common.button.fullRounded,
            { marginTop: wp(20), marginBottom: wp(20) },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={Common.button.buttonText}
            />
          ) : (
            <Text style={Common.button.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewWorkloadComponent;
