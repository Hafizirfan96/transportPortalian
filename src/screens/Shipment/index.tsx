import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import getStyles from './styles';

import { newWorkloadSelector } from '@/store/newWorkload';
import Input from '@/components/Input/Input';
import KolliForm from '@/components/kolliForm';
import Modal from 'react-native-modal';
import { navigate } from '@/navigators/Root';

const initialState: any[] | (() => any[]) = [];

const Shipment = props => {
  const { Layout, Colors, Common, FontSize, Gutters, Images } = useTheme();
  const styles = getStyles(Colors, FontSize);

  const { isLoading } = useAppSelector(newWorkloadSelector);
  const [KolliDetail, setList] = useState(initialState);
  const [isModalVisible, setModalVisible] = useState(false);
  console.log('props---', props);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const defaultValues = {
    KolliDetail: [],
  };

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'KolliDetail', // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });
  const sendDataToParent = data => {
    console.log('index----', data);
    setList(data);
  };
  const onSaveClick = (data: any) => {
    console.log('dataaa----', data);
    props.sendDataToNewWorkload(data);
    // navigate('NewWorkloadShipment');
  };

  const handleRemoveClick = (index: any) => {
    const updatedList = [...KolliDetail];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  return (
    <ScrollView style={styles.authWrapper} onPress={Keyboard.dismiss}>
      <View style={[styles.container]}>
        <Text style={[styles.textStyle, Gutters.smallLMargin]}>
          Receiver Information
        </Text>

        <View style={[styles.formView]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
            ]}
          >
            Receiver
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Name"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={false}
                />
              </View>
            )}
            name="ReceiverName"
            rules={{
              required: {
                value: true,
                message: 'ReceiverName is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.ReceiverName && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.ReceiverName?.message}
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.formView]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
            ]}
          >
            Phone
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Phone Number"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={true}
                />
              </View>
            )}
            name="ReceiverPhone"
            rules={{
              required: {
                value: true,
                message: 'Phone is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.ReceiverPhone && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.ReceiverPhone?.message}
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.formView]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
            ]}
          >
            Address
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Address"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={false}
                />
              </View>
            )}
            name="Address"
            rules={{
              required: {
                value: true,
                message: 'Address is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.Address && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.Address?.message}
              </Text>
            )}
          </View>
        </View>
        <Text
          style={[styles.textStyle, Gutters.smallLMargin, Gutters.smallTMargin]}
        >
          Sender Information{' '}
        </Text>
        <View style={[styles.formView]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
            ]}
          >
            Sender
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Name"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={false}
                />
              </View>
            )}
            name="SenderName"
            rules={{
              required: {
                value: true,
                message: 'SenderName is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.SenderName && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.SenderName?.message}
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.formView]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
            ]}
          >
            Phone
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Phone Number"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={true}
                />
              </View>
            )}
            name="SenderPhone"
            rules={{
              required: {
                value: true,
                message: 'Phone is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.SenderPhone && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.SenderPhone?.message}
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.formView]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
            ]}
          >
            Address
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Address"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={false}
                />
              </View>
            )}
            name="SenderAddress"
            rules={{
              required: {
                value: true,
                message: 'Address is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.SenderAddress && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.SenderAddress?.message}
              </Text>
            )}
          </View>
        </View>
        <View style={[styles.formView, Gutters.smallTMargin]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.regularLMargin,
            ]}
          >
            AirWayBill
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  placeholder="Trackingnumber"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  keyboardType={true}
                />
              </View>
            )}
            name="Trackingnumber"
            rules={{
              required: {
                value: true,
                message: 'Trackingnumber is required.',
              },
            }}
          />
          <View style={[styles.errorView]}>
            {errors.Trackingnumber && (
              <Text style={[styles.error, Gutters.smallLMargin]}>
                {errors?.Trackingnumber?.message}
              </Text>
            )}
          </View>
        </View>

        <View style={[Layout.row, styles.marginBottom30]}>
          <Text
            style={[
              styles.textStyle,
              Gutters.smallTMargin,
              Gutters.smallLMargin,
            ]}
          >
            New Kolli
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={Images.fabButtonIcon}
              style={[
                styles.addButtonStyle,
                Gutters.smallTMargin,
                Gutters.tinyLMargin,
              ]}
            />
          </TouchableOpacity>
        </View>

        {KolliDetail.map((x, i) => {
          // console.log('x-----', x);
          return (
            <View key={i} style={[Layout.row]}>
              <View
                style={[
                  Layout.column,
                  Layout.fill,
                  Layout.justifyContentCenter,
                ]}
              >
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Text style={[styles.textStyle, Gutters.smallLMargin]}>
                      {x.KolliID}
                    </Text>
                  )}
                  defaultValue={x}
                  name={`KolliDetail[${i}]`}
                  // rules={{
                  //   required: {
                  //     value: true,
                  //     message: 'KolliID is required field.',
                  //   },
                  // }}
                />
              </View>

              <View
                style={[
                  Layout.row,
                  Layout.fill,
                  Layout.justifyContentEnd,
                  Layout.alignItemsCenter,
                ]}
              >
                <TouchableOpacity>
                  <Image source={Images.notesIcon} style={[styles.editIcon]} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleRemoveClick(i)}>
                  <Image source={Images.deleteIcon} style={[styles.editIcon]} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      <View style={[Layout.fill]}>
        <Modal isVisible={isModalVisible}>
          <ScrollView style={[styles.scrollView]} onPress={Keyboard.dismiss}>
            <View style={[styles.modelView]}>
              <TouchableOpacity style={{}} onPress={toggleModal}>
                <Image
                  source={Images.crossIcon}
                  style={[styles.crossIcon, {}]}
                />
              </TouchableOpacity>
              <KolliForm
                sendDataToParent={sendDataToParent}
                toggleModal={toggleModal}
                list={KolliDetail}
              />
            </View>
          </ScrollView>
        </Modal>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSaveClick)}
        style={[
          Common.button.fullRounded,
          styles.container,
          Gutters.smallBMargin,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={Colors.white}
            style={Common.button.buttonText}
          />
        ) : (
          <Text style={Common.button.buttonText}>Add Shipment</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Shipment;
