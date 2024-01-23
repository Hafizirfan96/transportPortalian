import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  ActivityIndicator,
  Keyboard,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { useForm, Controller } from 'react-hook-form';
import DeviceInfo from 'react-native-device-info';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import getStyles from './style';
import { authSelector } from '@/store/auth';
import Input from '@/components/Input/Input';
import { wp } from '@/utils/layout-scaling';
import { navigate, navigateBack } from '@/navigators/Root';

function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    register,
  } = useForm();
  const { Colors, Images, Common, Gutters, Layout, Fonts } = useTheme();
  const styles = getStyles(Colors);

  const dispatch = useAppDispatch();
  const {
    userData,
    isError,
    error,
    loading: isLoading,
  } = useAppSelector(authSelector);
  const isSuccess = !isError;

  const onLoginClick = async (data: any) => {
    // console.log('data-----', data);
    const payload = {
      username: data.Email,
      password: data.Password,
      deviceId: await DeviceInfo.getUniqueId(),
    };
    // dispatch(login(payload));
  };
  const errorSection = () => {
    let errorText = '';
    if (isError == true) {
      errorText = 'Invalid email or password.';
    }
    return <Text style={styles.error}>{errorText}</Text>;
  };
  const handleNavigation = () => {
    console.log('clicked');
    navigate('ForgotPassword');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.authWrapper} onPress={Keyboard.dismiss}>
          <TouchableOpacity
            style={[Gutters.mediumPadding]}
            onPress={() => navigateBack()}
          >
            <Image source={Images.backArrow} style={[styles.backArrow]} />
          </TouchableOpacity>
          <View style={[Layout.alignItemsCenter]}>
            <Image
              source={Images.logoGreen}
              resizeMode="stretch"
              style={styles.logo}
            />
            <Text style={[styles.signInText, Gutters.extraLargeTMargin]}>
              Reset Your{'\n'} Password?
            </Text>
            <View style={[styles.subtitleView]}>
              <Text style={styles.subtitle}>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's
              </Text>
            </View>
            {isError && errorSection()}
            <View style={styles.formWrapper}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    icon={
                      <Image
                        source={Images.passwordIcon}
                        style={[styles.imageIcon]}
                      />
                    }
                    placeholder="New password"
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                    isPassword={true}
                  />
                )}
                name="oldPassword"
                rules={{ required: 'New password is required' }}
                defaultValue=""
              />
              <View style={[styles.errorView]}>
                {errors.oldPassword && (
                  <Text style={styles.error}>{errors.oldPassword.message}</Text>
                )}
              </View>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    icon={
                      <Image
                        source={Images.passwordIcon}
                        style={[styles.imageIcon]}
                      />
                    }
                    placeholder="Confirm Password"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    isPassword={true}
                  />
                )}
                name="newPassword"
                rules={{
                  required: 'Confirm password is required',
                  validate: (val: string) => {
                    const newPassword = watch('newPassword');
                    const oldPassword = watch('oldPassword');
                    if (!newPassword) {
                      return 'Please enter a new password';
                    }
                    if (oldPassword !== newPassword) {
                      return 'Your passwords do not match';
                    }
                    if (newPassword !== val) {
                      return 'Your passwords do not match';
                    }
                    return true;
                  },
                }}
                defaultValue=""
              />
              <View style={[styles.errorView]}>
                {errors.newPassword && (
                  <Text style={styles.error}>{errors.newPassword.message}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit(onLoginClick)}
                style={[Common.button.fullRounded]}
              >
                {isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.white}
                    style={Common.button.buttonText}
                  />
                ) : (
                  <Text style={Common.button.buttonText}>SAVE</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

export default ResetPassword;
