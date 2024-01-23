import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useTheme } from '@/hooks';
import _ from 'lodash';
import { wp, hp } from '@/utils/layout-scaling';

const VehicleCard = (props: any) => {
  const { Colors, Fonts, Gutters, Common, Layout, Images } = useTheme();
  const styles = getStyles(Colors);

  const ref_input_field = useRef(null);

  const handleNavigation = () => {
    props.handleNavigation(props.vehicle);
  };
  const initialState = props.vehicle.LastKm;
  const [kmtext, setKmtext] = useState(initialState);

  const editableKm = () => {
    ref_input_field?.current.focus();
  };

  const onInputText = (killometers: number) => {
    console.log('text entered ', killometers);
    setKmtext(killometers);
  };

  const debouncedSearch = _.debounce(onInputText, 1000);

  const inputTextKm = (killometers: string) => {
    debouncedSearch(killometers);
  };

  const vehicleStart = () => {
    const payload = {
      VehicleId: props.vehicle.VehicleId,
      StartKm: kmtext,
      StartPosition: 'Oslo',
    };
    props.vehicleStart(payload);
  };
  const vehicleEnd = () => {
    const endVehicles = {
      VehicleId: props.vehicle.VehicleId,
      TourVehicleId: props.vehicle.TourVehicleId,
      EndKm: 0,
      EndPosition: 'Oslo',
    };
    console.log('endVehicles', endVehicles);
    props.vehicleEnd(endVehicles);
  };

  return (
    <>
      <View
        style={[
          Gutters.smallPadding,
          Common.card,
          Gutters.mediumHMargin,
          Gutters.regularBMargin,
        ]}
      >
        <View style={[Layout.row]}>
          <TouchableOpacity onPress={handleNavigation}>
            <View
              style={[
                Layout.column,
                Layout.alignItemsStart,
                styles.imageWrapper,
              ]}
            >
              <Image
                source={require('@/assets/Images/demoimagesuzuki.png')}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation}>
            <View style={[Layout.column, styles.vehicleInfoWrapper]}>
              <View style={[Layout.column, Gutters.tinyMargin]}>
                <Text style={[Fonts.textRegularBold, Gutters.tinyRMargin]}>
                  {props.vehicle.RegistrationNumber}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[Fonts.textTiny, styles.lastPosition]}
                >
                  {props.vehicle.Name}
                </Text>
                {!props.vehicle.capacity && (
                  <View style={Layout.row}>
                    <Text style={[Fonts.textTiny, styles.textStyles]}>
                      Capacity:{' '}
                    </Text>
                    <Text style={[Fonts.textTinyBold]}>
                      {props.vehicle.capacity}
                    </Text>
                  </View>
                )}
                {!props.vehicle.time && (
                  <Text style={[Fonts.textTiny, styles.textStyles]}>
                    {props.vehicle.time}12 Mins away
                  </Text>
                )}
                {props.vehicle.LastPosition && (
                  <Text style={[Fonts.textTiny, styles.lastPosition]}>
                    {props.vehicle.LastPosition}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>

          {props.vehicle.IsVehicleActive ? (
            <TouchableOpacity onPress={vehicleEnd}>
              <Image source={Images.toggleOn} style={styles.cardTogglebtn} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={vehicleStart}>
              <Image source={Images.toggleOff} style={styles.cardTogglebtn} />
            </TouchableOpacity>
          )}
        </View>
        {!props.vehicle.IsVehicleActive ? (
          <View style={[Layout.row, styles.bottomlayout]}>
            <View
              style={[Layout.column, Layout.fill, Layout.justifyContentCenter]}
            >
              <Text style={[Fonts.textTiny]}>Killometer</Text>
            </View>

            <View style={[Layout.column, Layout.fill]}>
              <View
                style={[
                  Layout.row,
                  Layout.fill,
                  Layout.justifyContentEnd,
                  Layout.alignItemsCenter,
                  styles.inputView,
                ]}
              >
                <TextInput
                  ref={ref_input_field}
                  style={[styles.bottomInputTextStyle, Fonts.textTinyBold]}
                  keyboardType="numeric"
                  onChangeText={inputTextKm}
                  placeholder="0"
                  placeholderTextColor={Colors.secondaryTextColor}
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                  blurOnSubmit={false}
                />

                <Text style={[Fonts.textTinyBold]}>KM</Text>
                <TouchableOpacity onPress={editableKm}>
                  <Image source={Images.notesIcon} style={[styles.editIcon]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    cardImage: {
      maxWidth: wp(120),
      resizeMode: 'contain',
    },
    imageWrapper: {
      flex: 0.6,
    },
    vehicleInfoWrapper: {
      flex: 0.75,
    },
    cardTogglebtn: {
      // width: wp(30),
      // height: hp(24),
      // resizeMode: 'contain',
      right: wp(15),
    },

    textStyles: {
      fontSize: wp(10),
      color: colors.grey,
    },

    bottomInputTextStyle: {
      minWidth: wp(80),
      height: wp(40),
      textAlign: 'right',
      marginTop: wp(2),
      maxWidth: wp(100),
      left: wp(3),
    },
    inputView: { height: wp(20) },
    bottomlayout: {
      marginTop: wp(3),
      paddingTop: wp(5),
      borderTopWidth: wp(1.5),
      borderColor: colors.borderColor,
    },
    editIcon: {
      width: wp(15),
      height: hp(15),
      marginLeft: wp(10),
      resizeMode: 'contain',
    },
    lastPosition: {
      width: wp(120),
    },
  });
export default VehicleCard;
