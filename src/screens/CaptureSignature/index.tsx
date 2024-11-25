import React, { useRef } from 'react';
import { wp } from '@/utils/layout-scaling';
import { Button, Header } from '@/components';
import { navigateBack } from '@/navigators/Root';
import { useAppDispatch, useTheme } from '@/hooks';
import { signatureImagestored } from '@/store/Signature';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

const CaptureSignatureScreen = () => {
  const { Layout, Colors, Gutters } = useTheme();
  const styles = getStyles(Colors);

  const dispatch = useAppDispatch();
  const sign = useRef(null);

  const saveSign = () => {
    sign.current.saveImage();
  };

  const resetSign = () => {
    sign.current.resetImage();
  };

  const _onSaveEvent = (result: any) => {
    dispatch(signatureImagestored(`data:image/png;base64,${result.encoded}`));
    sign.current.resetImage();
    navigateBack();
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
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
          backgroundColor={Colors.signatureColor}
          showNativeButtons={false}
          showTitleLabel={false}
          saveImageFileInExtStorage={false}
          minStrokeWidth={4}
          maxStrokeWidth={4}
          viewMode={'portrait'}
        />
        <View style={[styles.seprator]} />
        <View
          style={[
            Layout.row,
            Gutters.mediumBPadding,
            Gutters.mediumHPadding,
            Layout.justifyContentEnd,
            styles.buttonWrapper,
          ]}
        >
          <Button
            title="Save"
            handleSubmit={() => {
              saveSign();
            }}
          />

          <View style={[Gutters.smallLMargin]}>
            <Button
              title="Reset"
              handleSubmit={() => {
                resetSign();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (Colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
    },
    seprator: {
      borderWidth: wp(1),
      borderColor: Colors.darkgray,
    },
    buttonWrapper: {
      backgroundColor: Colors.signatureColor,
    },
  });
export default CaptureSignatureScreen;
