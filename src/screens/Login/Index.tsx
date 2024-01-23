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
import getStyles from './style';
import { login } from '@/store/auth/login';
import { authSelector } from '@/store/auth';
import Input from '@/components/Input/Input';
import { wp } from '@/utils/layout-scaling';
import CheckBox from '@/components/CheckBox';
import { navigate } from '@/navigators/Root';
import ToastMessage from '@/components/Toast';
import Toast from 'react-native-toast-message';
// import { StorageKeys } from '@/utils/localStorage';
// import { storage } from '@/store';

function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { Colors, Images, Common, Gutters, Layout, Fonts } = useTheme();
  const styles = getStyles(Colors);

  const [rememberMe, setRememberMe] = useState(false);
  // const [email, setEmail] = useState('');
  const togleOn = () => {
    setRememberMe(!rememberMe);
  };

  const dispatch = useAppDispatch();
  const { isError, error, loading: isLoading } = useAppSelector(authSelector);

  // const isSuccess = !isError;
  // console.log('error---', isError);

  // useEffect(() => {
  //   if (isSuccess && userData !== null) {
  //     navigateAndSimpleReset('Main');
  //   }
  // }, [isSuccess, userData, isError]);
  // useEffect(() => {
  //   async function getRememberMe() {
  //     try {
  //       const emails = storage.getString(StorageKeys.email);
  //       const passwords = storage.getString(StorageKeys.password);
  //       var value = storage.getString(StorageKeys.rememberMe);
  //       if (value !== null) {
  //         setRememberMe(value);
  //         setEmail(emails);
  //         setPassword(passwords);
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving Remember Me flag:', error);
  //     }
  //   }
  //   getRememberMe();
  // }, []);
  const onLoginClick = async (data: any) => {
    var payload = {
      username: data.Email,
      password: data.Password,
      deviceId: await DeviceInfo.getUniqueId(),
    };
    // if (rememberMe) {
    //   try {
    //     storage.set(StorageKeys.email, data.Email);
    //     storage.set(StorageKeys.password, data.Password);
    //     storage.set(StorageKeys.rememberMe, JSON.stringify(true));
    //   } catch (error) {
    //     console.error('Error saving Remember Me flag and credentials:', error);
    //   }
    // }
    dispatch(login(payload));
  };
  const showToast = (error: string) => {
    Toast.show({
      type: 'error',
      text1: 'Error Message',
      text2: error,
    });
  };

  const errorSection = () => {
    if (isError == true) {
      showToast(error);
    }
  };
  const handleNavigation = () => {
    navigate('ForgotPassword');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <ToastMessage error={error} />
      {isError && errorSection()}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.authWrapper} onPress={Keyboard.dismiss}>
          <View style={[Layout.alignItemsCenter]}>
            <Image
              source={Images.logoGreen}
              resizeMode="stretch"
              style={styles.logo}
            />
            <Text style={[styles.signInText, Gutters.xxLargeTMargin]}>
              Sign in
            </Text>
            <View style={styles.formWrapper}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    icon={
                      <Image
                        source={Images.profile}
                        style={[styles.imageIcon]}
                      />
                    }
                    placeholder="User name/ Email address"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="Email"
                rules={{
                  required: {
                    value: true,
                    message: 'Email is required field.',
                  },
                  pattern: { value: EMAIL_REGEX, message: 'Invalid email' },
                }}
                // defaultValue="hafiz.irfan@codeit.pk"
              />
              <View style={[styles.errorView]}>
                {errors.Email && (
                  <Text style={styles.error}>{errors?.Email?.message}</Text>
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
                    placeholder="Password"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    isPassword={true}
                  />
                )}
                name="Password"
                rules={{
                  required: {
                    value: true,
                    message: 'Password is required field.',
                  },
                }}
                // defaultValue="123"
              />
              <View style={[styles.errorView]}>
                {errors.Password && (
                  <Text style={[styles.error]}>
                    {errors?.Password?.message}
                  </Text>
                )}
              </View>

              {/* <View style={[styles.rememberMeWrapper, Layout.row]}>
                <CheckBox onPress={togleOn} checked={rememberMe} />
                <Text style={[styles.checkboxText, Gutters.smallLMargin]}>
                  Remember Me
                </Text>
              </View> */}

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
                  <Text style={Common.button.buttonText}>SIGN IN</Text>
                )}
              </TouchableOpacity>
              {/* <View style={[Layout.alignItemsCenter, Gutters.tinyTMargin]}>
                <TouchableOpacity onPress={handleNavigation}>
                  <Text style={[Fonts.mediumFontFamily]}>Forgot password</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

export default LoginScreen;
