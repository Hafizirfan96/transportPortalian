import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import Input from '@/components/Input/Input';
import { AppButton } from '@/components';
import { SvgXml } from 'react-native-svg';

interface IProps {
  visible?: boolean;
  submitDisabled?: boolean;
  onSubmit?: () => any;
  onCancel?: () => any;
  handleKilometresChange?: (text: string) => void;
  kilometers?: string | number;
}

const KillometerUpdate = ({
  visible = false,
  onSubmit,
  onCancel,
  handleKilometresChange,
  kilometers,
  submitDisabled = false,
}: IProps) => {
  const { Layout, Gutters, Colors, Fonts, Images } = useTheme();
  return (
    <Modal isVisible={visible}>
      <View
        style={[
          Gutters.mediumPadding,
          styles.modalContainer,
          { backgroundColor: Colors.background },
        ]}
      >
        <TouchableOpacity
          style={[Layout.alignSelfEnd, Gutters.regularBMargin]}
          onPress={onCancel}
        >
          <SvgXml xml={Images.crossButton} width={wp(20)} height={wp(20)} />
        </TouchableOpacity>
        <Text style={[Layout.alignSelfCenter, Fonts.textNormalBold]}>
          Kilometers Update
        </Text>

        <View style={[Gutters.smallTMargin]}>
          <Text style={[Fonts.textTinyBold]}>Update Km</Text>
          <Input
            placeholder="Enter kilometres"
            outerStyle={[Gutters.smallBMargin, { marginTop: wp(7) }]}
            keyboardType={true}
            defaultValue={kilometers?.toString()}
            onChangeText={text => handleKilometresChange(text)}
          />
          <View style={[Layout.row, Layout.alignSelfEnd, Gutters.tinyTMargin]}>
            <AppButton
              disabled={submitDisabled}
              title="Submit"
              handleSubmit={onSubmit}
              bodyStyle={[
                Gutters.tinyRMargin,
                styles.submitButton,
                submitDisabled ? { backgroundColor: Colors.darkgray } : null,
              ]}
              textStyle={[
                styles.buttonText,
                submitDisabled ? { color: Colors.schedul } : null,
              ]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default KillometerUpdate;

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: wp(15),
  },
  submitButton: {
    width: wp(75),
    height: wp(29),
    paddingHorizontal: wp(10),
  },
  cancelButton: {
    width: wp(75),
    height: wp(29),
    paddingHorizontal: wp(10),
  },
  buttonText: {
    fontSize: wp(10),
  },
});
