import React from 'react';
import { useTheme } from '@/hooks';
import { wp, hp } from '@/utils/layout-scaling';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
  onOpenSignatureScreen: () => void;
  signatureImage?: string;
}

const Signature = ({ onOpenSignatureScreen, signatureImage }: IProps) => {
  const { Images, Layout, Fonts, Gutters } = useTheme();
  const styles = getStyles();

  const onOpenscreen = () => {
    onOpenSignatureScreen();
  };
  return (
    <View style={[Gutters.smallTMargin, Layout.alignItemsCenter]}>
      <TouchableOpacity onPress={onOpenscreen}>
        {signatureImage ? (
          <Image
            source={{ uri: signatureImage }}
            style={[
              styles.SignatureIcon,
              Layout.alignSelfCenter,
              Gutters.smallVMargin,
            ]}
          />
        ) : (
          <Image
            source={Images.signatureIcon}
            style={[styles.SignatureIcon, Layout.alignSelfCenter]}
            resizeMode="contain"
          />
        )}
        <Text style={[Fonts.textMediumLightBlack]}>
          Click here for Signature
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const getStyles = () =>
  StyleSheet.create({
    SignatureIcon: {
      width: wp(90),
      height: hp(90),
    },
  });

export default Signature;
