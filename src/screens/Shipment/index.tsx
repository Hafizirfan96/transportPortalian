import React from 'react';
import getStyles from './styles';
import { useTheme } from '@/hooks';
import Modal from 'react-native-modal';
import useShipment from '@/hooks/useShipment';
import KolliForm from '@/components/kolliForm';
import ShipmentInfo from '@/components/Shipment/ShipmentInfo';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const Shipment = () => {
  const { Layout, Colors, Common, FontSize, Gutters, Images } = useTheme();
  const styles = getStyles(Colors, FontSize);

  const {
    control,
    errors,
    toggleModal,
    KolliDetail,
    handleRemoveClick,
    isModalVisible,
    sendDataToParent,
    handleSubmit,
    onSaveClick,
    isLoading,
  } = useShipment();

  return (
    <CustomSafeArea>
      <ScrollView style={[styles.authWrapper]}>
        <View style={[styles.whiteSpace]} />
        <ShipmentInfo
          control={control}
          handleRemoveClick={handleRemoveClick}
          KolliDetail={KolliDetail}
          errors={errors}
          toggleModal={toggleModal}
        />

        <View style={[Layout.fill]}>
          <Modal isVisible={isModalVisible}>
            <ScrollView style={[styles.scrollView]}>
              <View style={[styles.modelView]}>
                <TouchableOpacity style={{}} onPress={toggleModal}>
                  <Image
                    source={Images.crossImage}
                    style={[
                      styles.crossIcon,
                      Layout.alignSelfEnd,
                      Gutters.smallMargin,
                    ]}
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
            Common.button.btnRegularRounded,
            styles.container,
            Gutters.smallVMargin,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <Text style={Common.button.buttonText}>Add Shipment</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </CustomSafeArea>
  );
};

export default Shipment;
