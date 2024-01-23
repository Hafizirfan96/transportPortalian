import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks';
import { wp, hp } from '@/utils/layout-scaling';

const Signature = props => {
  const { Images, Layout, Colors } = useTheme();
  const styles = getStyles(Colors);

  const onOpenscreen = () => {
    props.onOpenSignatureScreen();
  };
  return (
    <View style={[styles.marginTop20, Layout.alignItemsCenter]}>
      <TouchableOpacity onPress={onOpenscreen}>
        {props.signatureImage ? (
          <Image
            source={{ uri: props.signatureImage }}
            style={styles.SignatureIcon}
          />
        ) : (
          <Image source={Images.signatureIcon} style={styles.SignatureIcon} />
        )}
        <Text style={[styles.textStyle]}>Click here for Signature</Text>
      </TouchableOpacity>
    </View>
  );
};
const getStyles = Colors =>
  StyleSheet.create({
    SignatureIcon: {
      width: wp(100),
      height: hp(100),
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    textStyle: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(13),
      color: Colors.text,
    },
    marginTop20: {
      marginTop: 20,
    },
  });

export default Signature;
