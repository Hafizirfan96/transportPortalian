import React from 'react';
import Button from '../Button';
import { useTheme } from '@/hooks';
import Modal from 'react-native-modal';
import { AppButton } from '@/components';
import { SvgXml } from 'react-native-svg';
import { wp } from '@/utils/layout-scaling';
import { useRegisterDamage } from '@/hooks';
import getStyles from '@/screens/RegisterNewDamage/styles';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const RegisterNewDamageComponent = () => {
  const { Layout, Gutters, Images, Fonts, Colors } = useTheme();
  const {
    text,
    onChangeText,
    filePaths,
    captureFile,
    chooseFiles,
    removeImage,
    createDamage,
    isLoading,
    isVisible,
    setIsVisible,
    error,
  } = useRegisterDamage();
  const styles = getStyles();

  return (
    <View>
      <View style={[styles.textContainer]}>
        <TextInput
          value={text}
          style={[styles.commentInputText]}
          onChangeText={onChangeText}
          placeholder="Description"
          multiline
          numberOfLines={8}
          maxLength={500}
          textAlignVertical="top"
        />
      </View>
      {error && (
        <View style={[Gutters.regularLMargin]}>
          <Text style={[Fonts.textSmall, { color: Colors.red }]}>{error}</Text>
        </View>
      )}

      {filePaths.length > 0 && (
        <ScrollView horizontal>
          <View style={[Layout.row, Gutters.smallHPadding]}>
            {filePaths.map((filePath: any, index: number) => {
              return (
                <View key={index} style={[Gutters.tinyMargin]}>
                  <ImageBackground
                    source={{
                      uri: filePath.uri,
                    }}
                    style={[styles.image]}
                    imageStyle={[styles.imageStyle]}
                  >
                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      style={[
                        Layout.center,
                        Layout.alignSelfEnd,
                        Gutters.smallPadding,
                      ]}
                    >
                      <Image source={Images.cross} />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}

      <View
        style={[Layout.row, Layout.justifyContentEnd, Gutters.regularHPadding]}
      >
        <View style={[Gutters.smallRMargin]}>
          <Button title="Add Image" handleSubmit={() => setIsVisible(true)} />
        </View>
        {filePaths.length !== 0 && (
          <Button
            title="SUBMIT"
            backgroundColor={true}
            handleSubmit={() => filePaths.length !== 0 && createDamage()}
            disabled={filePaths.length === 0}
            isLoading={isLoading}
          />
        )}
      </View>

      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={Layout.alignSelfEnd}
            onPress={() => setIsVisible(false)}
          >
            <SvgXml xml={Images.crossButton} width={wp(24)} height={wp(24)} />
          </TouchableOpacity>
          <AppButton title="Capture Image" handleSubmit={captureFile} />
          <AppButton title="Upload gallery" handleSubmit={chooseFiles} />
        </View>
      </Modal>
    </View>
  );
};

export default RegisterNewDamageComponent;
