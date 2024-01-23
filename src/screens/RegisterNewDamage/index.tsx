import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useAppDispatch, useTheme } from '@/hooks';
import getStyles from './styles';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import Header from '@/components/Header';
import { launchImageLibrary } from 'react-native-image-picker';
import { localFilesStored } from '@/store/localFileUpload';
import { navigateBack } from '@/navigators/Root';

const RegisterNewDamage = () => {
  const { Layout, Common, Colors, Gutters } = useTheme();
  const styles = getStyles(Colors);

  const [filePaths, setFilePaths] = useState([]);
  const [text, onChangeText] = useState('');
  const dispatch = useAppDispatch();

  const chooseFiles = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      selectionLimit: 3,
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel && !response.errorCode) {
        const newFilePaths = response.assets.map(asset => asset.uri);
        // console.log('multipale image---', newFilePaths);
        setFilePaths(prevFilePaths => [...prevFilePaths, ...newFilePaths]);
      }
    });
  };
  const _uploadImage = () => {
    const payload = {
      description: text,
      files: filePaths,
    };
    if (filePaths.length > 0) {
      dispatch(localFilesStored(payload));
      navigateBack();
    }
  };

  return (
    <CustomSafeArea>
      <Header title="Register New Damage" backPage="VehicleInspection" />
      <View style={[styles.textContainer]}>
        <TextInput
          value={text}
          style={[styles.commentInputText]}
          onChangeText={onChangeText}
          placeholder="Description"
          multiline
          numberOfLines={8}
          maxLength={520}
          textAlignVertical="top"
        ></TextInput>
        {filePaths && (
          <View style={[Layout.row]}>
            {filePaths.map((filePath, index) => (
              <View
                key={index}
                style={[Gutters.mediumTMargin, Gutters.tinyMargin]}
              >
                <Image
                  source={{
                    uri: filePath,
                  }}
                  style={[styles.image]}
                />
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          onPress={chooseFiles}
          style={[Common.button.fullRounded, styles.uploadImge]}
        >
          <Text style={Common.button.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        <View style={[styles.submitbutton, Layout.justifyContentCenter]}>
          <TouchableOpacity onPress={_uploadImage}>
            <Text style={[Common.button.buttonText]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomSafeArea>
  );
};
export default RegisterNewDamage;
