import React from 'react';
import { useTheme } from '@/hooks';
import Seprator from '../Seprator';
import EmptyList from '../EmptyList';
import getStyles from '@/screens/VehicleInspection/styles';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const VehicleInspectionInfo = ({
  ref_input_field,
  selectedList,
  onChangeKM,
  editableKm,
  vehicleinspectiondata,
  renderItem,
}: {
  ref_input_field: any;
  selectedList: any;
  onChangeKM: any;
  editableKm: any;
  vehicleinspectiondata: any;
  renderItem: any;
}) => {
  const { Colors, Layout, Images, Gutters, Fonts } = useTheme();
  const styles = getStyles(Colors);

  return (
    <>
      <Seprator />

      <View style={[Layout.row, Layout.justifyContentBetween]}>
        <Text style={[Fonts.textMediumBold, Layout.alignSelfCenter]}>
          Killometer
        </Text>

        <View style={[Layout.row, Layout.center]}>
          <TextInput
            ref={ref_input_field}
            style={[styles.kmText]}
            keyboardType="numeric"
            value={selectedList.Km}
            onChangeText={onChangeKM}
            placeholder="0"
            placeholderTextColor={Colors.secondaryTextColor}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            blurOnSubmit={false}
          />
          <TouchableOpacity onPress={editableKm}>
            <Image
              source={Images.editImage}
              style={[styles.noteIcon, Gutters.smallLMargin]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Seprator />

      <FlatList
        data={vehicleinspectiondata}
        renderItem={renderItem}
        keyExtractor={item => item.GroupName}
        ListEmptyComponent={<EmptyList text="No product is available." />}
      />
    </>
  );
};

export default VehicleInspectionInfo;
