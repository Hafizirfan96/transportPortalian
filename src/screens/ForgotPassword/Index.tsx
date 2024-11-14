import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { useForm, Controller } from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import getStyles from './style';
import { fogotInfo } from '@/store/forgotPassword/forgotInfo';
import { forgotSelector } from '@/store/forgotPassword';
import Input from '@/components/Input/Input';
import { wp } from '@/utils/layout-scaling';
import { navigate, navigateBack } from '@/navigators/Root';
import { showToast } from '@/store/appState';

function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { Colors, Images, Common, Gutters, Layout, Fonts } = useTheme();
  const styles = getStyles(Colors);
  const dispatch = useAppDispatch();
  const {
    isError,
    error,
    isLoading: isLoading,
  } = useAppSelector(forgotSelector);

  const onLoginClick = async (data: any) => {
    Keyboard.dismiss();
    const payload = {
      Email: data.Email,
    };
    dispatch(fogotInfo(payload));
    // navigate('ResetPassword');
  };
  const errorSection = () => {
    if (isError == true) {
      dispatch(
        showToast({
          type: 'error',
          text1: 'Error Message',
          text2: error,
        }),
      );
    }
  };

  return (
    <>
      {isError && errorSection()}

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
              Forgot Your{'\n'} Password?
            </Text>
            <View style={[styles.subtitleView]}>
              <Text style={styles.subtitle}>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's
              </Text>
            </View>

            <View style={[styles.formWrapper, Gutters.mediumTMargin]}>
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
                    placeholder="Type your Email address"
                    onChangeText={value => onChange(value)}
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
                defaultValue=""
              />
              <View style={[styles.errorView]}>
                {errors.Email && (
                  <Text style={styles.error}>{errors?.Email?.message}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit(onLoginClick)}
                style={[Common.button.fullRounded, Gutters.regularTMargin]}
              >
                {isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.white}
                    style={Common.button.buttonText}
                  />
                ) : (
                  <Text style={Common.button.buttonText}>SEND</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

export default ForgotPassword;
