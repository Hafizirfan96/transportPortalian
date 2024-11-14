import React from 'react';
import { useTheme } from '@/hooks';
import useLogin from '@/hooks/useLogin';
import { StatusBar } from 'react-native';
import Login from '@/components/Login/Login';

function LoginScreen() {
  const { Colors } = useTheme();

  const {
    isError,
    errorSection,
    control,
    EMAIL_REGEX,
    handleSubmit,
    onLoginClick,
    isLoading,
    errors,
    togleOn,
    rememberMe,
  } = useLogin();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      {isError && errorSection()}

      <Login
        control={control}
        EMAIL_REGEX={EMAIL_REGEX}
        errors={errors}
        handleSubmit={handleSubmit}
        onLoginClick={onLoginClick}
        isLoading={isLoading}
        togleOn={togleOn}
        rememberMe={rememberMe}
      />
    </>
  );
}

export default LoginScreen;
