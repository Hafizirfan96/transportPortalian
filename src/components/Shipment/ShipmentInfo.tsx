import React from 'react';
import Seprator from '../Seprator';
import Input from '../Input/Input';
import { useTheme } from '@/hooks';
import SubTitle from '../SubTitle';
import { wp } from '@/utils/layout-scaling';
import { Controller } from 'react-hook-form';
import getStyles from '@/screens/Shipment/styles';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShipmentInfo = ({
  control,
  handleRemoveClick,
  KolliDetail,
  errors,
  toggleModal,
}: {
  control: any;
  handleRemoveClick: any;
  KolliDetail: any;
  errors: any;
  toggleModal: any;
}) => {
  const { Layout, Colors, FontSize, Gutters, Images } = useTheme();
  const styles = getStyles(Colors, FontSize);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.textStyle, Gutters.smallTMargin]}>
        Receiver Information
      </Text>
      <View style={[Gutters.smallTMargin]}>
        <Seprator />
      </View>
      <View style={[Gutters.smallTMargin]}>
        <SubTitle text="Receiver" />
      </View>
      <View style={[styles.formView]}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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
        />
      </View>

      <View style={[styles.formView]}>
        <View style={[Gutters.mediumTMargin]}>
          <SubTitle text="Phone" />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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
        />
      </View>

      <View style={[styles.formView]}>
        <View style={[Gutters.mediumTMargin]}>
          <SubTitle text="Address" />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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
        <View style={[Gutters.tinyTMargin]}>
          {errors.Address && (
            <Text style={[styles.error]}>
              {errors?.Address?.message?.toString()}
            </Text>
          )}
        </View>
      </View>
      <Text style={[styles.textStyle, Gutters.mediumTMargin]}>
        Sender Information{' '}
      </Text>
      <View style={[Gutters.smallTMargin]}>
        <Seprator />
      </View>
      <View style={[styles.formView]}>
        <View style={[Gutters.smallTMargin]}>
          <SubTitle text="Sender" />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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
        />
      </View>

      <View style={[styles.formView]}>
        <View style={[Gutters.mediumTMargin]}>
          <SubTitle text="Phone" />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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
        />
      </View>

      <View style={[styles.formView]}>
        <View style={[Gutters.mediumTMargin]}>
          <SubTitle text="Address" />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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
        <View style={[Gutters.tinyTMargin]}>
          {errors.SenderAddress && (
            <Text style={[styles.error]}>
              {errors?.SenderAddress?.message?.toString()}
            </Text>
          )}
        </View>
      </View>
      <View style={[styles.formView, Gutters.smallTMargin]}>
        <View style={[Gutters.smallTMargin]}>
          <SubTitle text="AirWayBill" />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Gutters.tinyTMargin]}>
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
        <View style={[Gutters.tinyTMargin]}>
          {errors.Trackingnumber && (
            <Text style={[styles.error]}>
              {errors?.Trackingnumber?.message?.toString()}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={toggleModal}
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Gutters.mediumTMargin,
          Gutters.smallBMargin,
        ]}
      >
        <View style={[Gutters.regularRMargin]}>
          <SubTitle text="Add New Kolli" />
        </View>
        <View style={[Layout.center, styles.addIcon]}>
          <MaterialCommunityIcons
            name="plus"
            color={Colors.black}
            size={wp(12)}
          />
        </View>
      </TouchableOpacity>

      {KolliDetail.map((x: any, i: any) => {
        return (
          <>
            {KolliDetail.length > 0 && (
              <View style={[Gutters.tinyTMargin]}>
                <Seprator />
              </View>
            )}
            <View key={i} style={[Layout.row, Gutters.tinyTMargin]}>
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
                    <SubTitle text={x.KolliID} />
                  )}
                  defaultValue={x}
                  name={`KolliDetail[${i}]`}
                  rules={{
                    required: {
                      value: true,
                      message: 'KolliID is required field.',
                    },
                  }}
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
                  <Image source={Images.editImage} style={[styles.editIcon]} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleRemoveClick(i)}>
                  <Image
                    source={Images.deleteImage}
                    style={[styles.editIcon]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      })}
      {KolliDetail.length > 0 && (
        <View style={[Gutters.tinyTMargin]}>
          <Seprator />
        </View>
      )}
    </View>
  );
};

export default ShipmentInfo;
