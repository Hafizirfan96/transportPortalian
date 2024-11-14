import { useAppDispatch, useTheme } from '@/hooks';
import React from 'react';
import { wp, hp } from '@/utils/layout-scaling';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { setVehicleId } from '@/store/vehicle';

const VehicleCard = (props: {
  key: any;
  isUpdating: boolean;
  vehicle: any;
  index: Number;
  handleNavigation: any;
  vehicleStart: any;
  vehicleEnd: any;
}) => {
  const dispatch = useAppDispatch();
  const { Colors, Fonts, Gutters, Common, Layout, Images } = useTheme();
  const styles = getStyles(Colors);
  const handleNavigation = () => {
    dispatch(setVehicleId(props.vehicle.VehicleId));
    props.handleNavigation(props.vehicle);
  };

  const vehicleStart = () => {
    props.vehicleStart({
      ...props.vehicle,
      index: props.index,
    });
    Keyboard.dismiss();
  };

  const vehicleEnd = () => {
    props.vehicleEnd({
      ...props.vehicle,
      index: props.index,
    });
    Keyboard.dismiss();
  };
  return (
    <View
      style={[
        Gutters.smallPadding,
        Common.card,
        Gutters.mediumHMargin,
        Gutters.smallBMargin,
      ]}
    >
      <KeyboardAvoidingView
        behavior="position"
        // keyboardVerticalOffset={100}
        needsOffscreenAlphaCompositing={true}
      >
        <View style={[Layout.row]}>
          <TouchableOpacity onPress={handleNavigation}>
            <View
              style={[
                Layout.column,
                Layout.alignItemsStart,
                // styles.imageWrapper,
              ]}
            >
              <Image
                source={require('@/assets/Images/demoimagesuzuki.png')}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNavigation}
            disabled={props.isUpdating}
          >
            <View style={[Layout.column]}>
              <View style={[Layout.column, Gutters.tinyMargin]}>
                <Text style={[Fonts.textRegularBold, Gutters.tinyRMargin]}>
                  {props.vehicle.RegistrationNumber}
                </Text>
                <View style={Layout.row}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[Fonts.textTiny, styles.lastPosition]}
                  >
                    {props.vehicle.Name}
                  </Text>
                </View>

                {!props.vehicle.capacity && (
                  <View style={Layout.row}>
                    <Text style={[Fonts.textTinyBold, styles.textStyles]}>
                      Capacity:{' '}
                    </Text>
                    <Text style={[Fonts.textTiny]}>
                      {props.vehicle.Capacity}
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

          {props.isUpdating ? (
            <ActivityIndicator
              size={35}
              style={[Layout.justifyContentFlexStart]}
            />
          ) : (
            <View style={[Gutters.tinyTMargin]}>
              {props.vehicle.IsVehicleActive ? (
                <TouchableOpacity onPress={vehicleEnd}>
                  <Image
                    source={Images.toggleOn}
                    style={[styles.cardTogglebtn]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={vehicleStart}>
                  <Image
                    source={Images.toggleOff}
                    style={[styles.cardTogglebtn]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
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
              {/* <TextInput
                ref={ref_input_field}
                style={[styles.bottomInputTextStyle, Fonts.textTinyBold]}
                keyboardType="numeric"
                value={kmtext}
                onChangeText={inputTextKm}
                placeholder={props.vehicle.LastKm.toString()}
                placeholderTextColor={Colors.grey}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                blurOnSubmit={false}
                focusable={true}
                onBlur={() => {
                  ref_input_field.current?.blur();
                  Keyboard.dismiss();
                }}
              /> */}
              {/* <Text style={[styles.bottomInputTextStyle, Fonts.textTinyBold]}>
                {props.vehicle.LastKm}
              </Text> */}
              <Text style={[styles.bottomInputTextStyle, Fonts.textTinyBold]}>
                {props.vehicle.LastKm} KM
              </Text>
              {/* <TouchableOpacity onPress={editableKm}> */}
              <Image source={Images.notesIcon} style={[styles.editIcon]} />
              {/* </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
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
      width: wp(32),
      height: wp(20),
    },

    textStyles: {
      fontSize: wp(11),
      color: colors.black,
    },

    bottomInputTextStyle: {
      minWidth: wp(80),
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
