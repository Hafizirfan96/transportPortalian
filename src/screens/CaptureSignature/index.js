import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Header } from '@/components';
import { useAppDispatch, useTheme } from '@/hooks';
import SignatureCapture from 'react-native-signature-capture';
import { navigateBack } from '@/navigators/Root';
import { signatureImagestored } from '@/store/signature';
import { wp, hp } from '@/utils/layout-scaling';

const CaptureSignatureScreen = () => {
  const { Fonts, Layout, Colors } = useTheme();
  const styles = getStyles(Colors);

  const dispatch = useAppDispatch();
  const sign = useRef(null);

  const saveSign = () => {
    console.log('saveSignature');
    sign.current.saveImage();
  };

  const resetSign = () => {
    sign.current.resetImage();
  };

  const _onSaveEvent = result => {
    dispatch(signatureImagestored(`data:image/png;base64,${result.encoded}`));
    sign.current.resetImage();
    navigateBack();
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
  };

  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    // console.log('dragged---');
  };
  return (
    <SafeAreaView style={[styles.container, Layout.fill]}>
      <Header backPage="CaptureSignature" title="Signature" />
      <View style={[styles.container, Layout.fill]}>
        <SignatureCapture
          style={[Layout.fill]}
          ref={sign}
          maxSize={1000}
          onSaveEvent={_onSaveEvent}
          onDragEvent={_onDragEvent}
          backgroundColor={Colors.signatureColor}
          showNativeButtons={false}
          showTitleLabel={false}
          saveImageFileInExtStorage={false}
          minStrokeWidth={4}
          maxStrokeWidth={4}
          viewMode={'portrait'}
        />
        <View style={[Layout.row]}>
          <TouchableHighlight
            style={[styles.buttonStyle, Layout.center, Layout.fill]}
            onPress={() => {
              saveSign();
            }}
          >
            <Text style={[Fonts.textSmall]}>Save</Text>
          </TouchableHighlight>
          <TouchableOpacity
            style={[styles.buttonStyle, Layout.center, Layout.fill]}
            onPress={() => {
              resetSign();
            }}
          >
            <Text style={[Fonts.textSmall]}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
    buttonStyle: {
      height: hp(50),
      backgroundColor: colors.appColor,
      margin: wp(10),
      borderRadius: wp(30),
    },
  });
export default CaptureSignatureScreen;
