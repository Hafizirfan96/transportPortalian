import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks';
import getStyles from './styles';

const VehicleDetailCard = props => {
  const { Layout, Fonts, Common, Gutters, Colors, FontSize, Images } =
    useTheme();
  const styles = getStyles(Colors, FontSize);
  const handleNavigation = () => {
    props.handleNavigation(props.vehicleinfo);
  };
  const handleNavigationService = () => {
    props.handleNavigationService();
  };

  return (
    <View
      style={[
        Gutters.smallPadding,
        Common.card,
        Gutters.mediumHMargin,
        Gutters.regularBMargin,
      ]}
    >
      <View style={[Gutters.tinyMargin]}>
        <View style={[Layout.colCenter]}>
          <Image
            source={require('@/assets/Images/demoimagesuzuki.png')}
            style={styles.imagewidthHeight}
          />
        </View>
        <View style={[]}>
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Text style={[Fonts.textRegularBold]}>
              {props.vehicleinfo.RegistrationNumber}{' '}
            </Text>
            <Text style={[Fonts.textTinyBold]}>{props.vehicleinfo.Name}</Text>
          </View>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <Text style={[Fonts.textSmall]}>
              Capacity: {props.vehicleinfo.Capacity}
            </Text>
            <Text style={[Fonts.textSmall]}>12 Mins away</Text>
          </View>
        </View>

        <View
          style={[
            Layout.row,
            Layout.justifyContentBetween,
            styles.bottomlayout,
            Gutters.smallVMargin,
            Gutters.smallTPadding,
          ]}
        >
          <Text style={[Fonts.textSmall]}>Killometer</Text>
          <View style={[Layout.row]}>
            <Text style={[Fonts.textSmall]}>{props.vehicleinfo.LastKm}KM</Text>
            {/* <Image source={Images.notesIcon} style={styles.iconstyle} /> */}
          </View>
        </View>
        <View
          style={[
            Layout.row,
            Layout.justifyContentAround,
            Gutters.smallVMargin,
          ]}
        >
          <TouchableOpacity
            style={[Common.button.btnSmallRounded]}
            onPress={handleNavigationService}
          >
            <Text style={[Fonts.textSmall]}>Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Common.button.btnSmallRounded]}
            onPress={handleNavigation}
          >
            <Text style={[Fonts.textSmall]}>Inspection</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default VehicleDetailCard;
