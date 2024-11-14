import React from 'react';
import getStyles from './styles';
import { useTheme } from '@/hooks';
import AppButton from '@/components/AppButton';
import { Text, View, Image } from 'react-native';
import useDamageControl from '@/hooks/useDamageControl';

const VehicleDetailCard = (props: any) => {
  const { Layout, Fonts, Common, Gutters, Colors, FontSize } = useTheme();
  const styles = getStyles(Colors, FontSize);
  const navigationToInspection = () => {
    props.handleNavigation(props.vehicleinfo);
  };
  const handleNavigationService = () => {
    props.handleNavigationService();
  };
  const { handleNavigation } = useDamageControl();

  return (
    <View
      style={[
        Gutters.smallHPadding,
        Gutters.smallBPadding,
        Gutters.tinyTPadding,
        Common.card,
        Gutters.mediumHMargin,
      ]}
    >
      <View style={[Gutters.tinyMargin]}>
        <View style={[Layout.colCenter]}>
          <Image
            source={require('@/assets/Images/demoimagesuzuki.png')}
            style={styles.imagewidthHeight}
          />
        </View>
        <View>
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
            Layout.justifyContentBetween,
            Gutters.smallTMargin,
          ]}
        >
          <View style={[Layout.halfWidth, Gutters.smallRPadding]}>
            <AppButton title="Service" handleSubmit={handleNavigationService} />
          </View>
          <View style={[Layout.halfWidth, Gutters.tinyLPadding]}>
            <AppButton
              title="Inspection"
              handleSubmit={navigationToInspection}
            />
          </View>
        </View>
        <View style={[Gutters.smallTMargin]}>
          <AppButton
            title="Register New Damage"
            handleSubmit={handleNavigation}
          />
        </View>
      </View>
    </View>
  );
};
export default VehicleDetailCard;
