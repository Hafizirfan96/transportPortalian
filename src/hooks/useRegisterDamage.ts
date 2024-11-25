import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { setDamageFiles, setDamageDesc } from '@/store/appState';
import { getSelectedVehicleId } from '@/store/vehicle';
import { registerDamage } from '@/store/vehicleInspection/vehicleInspection';
import { navigateBack } from '@/navigators/Root';
import { FileEntityType } from '@/enums';
import { PermissionsAndroid } from 'react-native';
import { createVehicleDamage } from '@/services/VehicleInspection';

export default function () {
  const dispatch = useAppDispatch();
  const vId = useAppSelector(getSelectedVehicleId);
  const { files: filePaths, description: text } = useAppSelector(
    state => state.appState.registerDamage,
  );
  const [isLoading, setIsloading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

  const onChangeText = (val: string) => {
    dispatch(setDamageDesc(val));
  };

  const chooseFiles = () => {
    setIsVisible(false);
    const options = {
      mediaType: 'photo',
      selectionLimit: 10,
    } as any;
    launchImageLibrary(options, (response: any) => {
      if (!response.didCancel && !response.errorCode) {
        const newFilePaths = response.assets.map((asset: any) => asset);
        dispatch(setDamageFiles([...filePaths, ...newFilePaths]));
      }
    });
  };

  const captureFile = async () => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
      const options = { mediaType: 'photo' } as CameraOptions;

      launchCamera(options, (res: ImagePickerResponse) => {
        let file = res?.assets?.[0];
        const source = { uri: file?.uri, type: file?.type };
        file && dispatch(setDamageFiles([...filePaths, source]));
        setIsVisible(false);
      });
    } else {
      console.log('Camera permission denied');
    }
  };

  const removeImage = (index: number) => {
    const updatedFilePaths = filePaths.filter((_, i) => i !== index);
    dispatch(setDamageFiles(updatedFilePaths));
  };

  const getDamageData = (damageId: string) => {
    const formData = new FormData();
    if (filePaths.length > 0) {
      filePaths.forEach((asset: any) => {
        const fileName = asset.fileName || `photo_${Date.now()}.jpg`;
        formData.append('Files[]', {
          uri: asset.uri,
          type: asset.type,
          name: fileName,
        });
      });
      formData.append('fileType', 'jpeg');
      formData.append('EntityType', FileEntityType.Damage);
      formData.append('EntityId', damageId);
    }
    return formData;
  };

  const createDamage = async () => {
    if (!text || !vId) {
      setError('Description required');
      return;
    }
    setIsloading(true);
    const res = await createVehicleDamage({
      DamageDetail: text,
      VehicleId: vId,
    });
    const damageData = getDamageData(res);
    await dispatch(registerDamage(damageData));
    dispatch(setDamageFiles([]));
    dispatch(setDamageDesc(''));
    setIsloading(false);
    navigateBack();
  };

  return {
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
  };
}
