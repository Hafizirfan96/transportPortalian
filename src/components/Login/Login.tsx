import React from 'react';
import Input from '../Input/Input';
import { useTheme } from '@/hooks';
import AppButton from '../AppButton';
import CheckBox from '@/components/CheckBox';
import { Controller } from 'react-hook-form';
import getStyles from '@/screens/Login/style';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

const Login = ({
  control,
  EMAIL_REGEX,
  errors,
  handleSubmit,
  onLoginClick,
  isLoading,
  togleOn,
  rememberMe,
}: {
  control: any;
  EMAIL_REGEX: any;
  errors: any;
  handleSubmit: Function;
  onLoginClick: Function;
  isLoading: boolean;
  togleOn: any;
  rememberMe: boolean;
}) => {
  const { Colors, Images, Gutters, Layout, Fonts } = useTheme();
  const styles = getStyles(Colors);
  return (
    <KeyboardAvoidingView style={[Layout.fill]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={[{}]}
          contentContainerStyle={[Layout.fill, styles.whiteBackground]}
        >
          <View
            style={[
              Layout.fill,
              Layout.alignItemsCenter,
              Layout.justifyContentCenter,
            ]}
          >
            <Image source={Images.logoGreen} style={[styles.logo]} />
            <Text
              style={[
                Fonts.textLargeBold,
                Layout.textAlignmentCenter,
                Gutters.mediumTMargin,
              ]}
            >
              Welcome to Transport Portalen
            </Text>
            <View style={[styles.formWrapper, Gutters.regularTMargin]}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    icon={
                      <Image
                        source={Images.profile}
                        style={[styles.imageIcon, Gutters.tinyLMargin]}
                        resizeMode="contain"
                      />
                    }
                    placeholder="User name/ Email address"
                    onChangeText={text => {
                      onChange(text);
                    }}
                    value={value}
                    onBlur={onBlur}
                    onSubmitEditing={handleSubmit(onLoginClick)}
                    keyboardType={undefined}
                    validationComponent={
                      <View style={[Gutters.smallTMargin]}>
                        {errors.Email && (
                          <Text style={[styles.error]}>
                            {errors?.Email?.message?.toString()}
                          </Text>
                        )}
                      </View>
                    }
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
              />
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      icon={
                        <Image
                          source={Images.passwordIcon}
                          style={[styles.imageIcon, Gutters.tinyLMargin]}
                          resizeMode="contain"
                        />
                      }
                      onSubmitEditing={handleSubmit(onLoginClick)}
                      placeholder="Password"
                      onChangeText={text => {
                        onChange(text);
                      }}
                      value={value}
                      onBlur={onBlur}
                      isPassword={true}
                      keyboardType={undefined}
                      validationComponent={
                        <View style={[Gutters.smallTMargin]}>
                          {errors.Password && (
                            <Text style={[styles.error]}>
                              {errors?.Password?.message?.toString()}
                            </Text>
                          )}
                        </View>
                      }
                    />
                  )}
                  name="Password"
                  rules={{
                    required: {
                      value: true,
                      message: 'Password is required field.',
                    },
                  }}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.rememberMeWrapper,
                  Layout.row,
                  Layout.alignItemsCenter,
                  Gutters.regularTMargin,
                ]}
                onPress={togleOn}
              >
                <CheckBox checked={rememberMe} addMarginRight={true} />

                <Text style={[Fonts.textNormalBold]}>Remember Me</Text>
              </TouchableOpacity>
              <View style={[Gutters.mediumTMargin]}>
                <AppButton
                  title="Sign in"
                  handleSubmit={handleSubmit(onLoginClick)}
                  isLoading={isLoading}
                />
              </View>
              {/* <View style={[Layout.alignItemsCenter, Gutters.tinyTMargin]}>
                <TouchableOpacity onPress={handleNavigation}>
                  <Text style={[Fonts.mediumFontFamily]}>Forgot password</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
