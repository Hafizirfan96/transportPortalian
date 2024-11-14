import { useAppDispatch, useAppSelector } from '@/hooks';
import StorageService from '@/services/StorageService';
import { showToast } from '@/store/appState';
import { authSelector, clearUserData } from '@/store/auth';
import { login } from '@/store/auth/login';
import { StorageKeys } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DeviceInfo from 'react-native-device-info';

export default function () {
  const [rememberMe, setrememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      Email: email,
      Password: password,
    },
  });
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const dispatch = useAppDispatch();

  const { isError, error, loading: isLoading } = useAppSelector(authSelector);

  const onLoginClick = async (data: any) => {
    if (rememberMe) {
      await StorageService.set(StorageKeys.rememberMe, JSON.stringify(true));
      await StorageService.set(StorageKeys.email, getValues('Email'));
      await StorageService.set(StorageKeys.password, getValues('Password'));
    } else {
      StorageService.set(StorageKeys.rememberMe, JSON.stringify(false));
      StorageService.clear(StorageKeys.email);
      StorageService.clear(StorageKeys.password);
    }
    var payload = {
      username: data.Email,
      password: data.Password,
      deviceId: await DeviceInfo.getUniqueId(),
    };
    dispatch(login(payload));
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
      dispatch(clearUserData());
    }
  };
  // const [rememberMe, setRememberMe] = useState(false);

  const togleOn = () => {
    setrememberMe(!rememberMe);
  };

  // const isSuccess = !isError;
  // console.log('error---', isError);

  // useEffect(() => {
  //   if (isSuccess && userData !== null) {
  //     navigateAndSimpleReset('Main');
  //   }
  // }, [isSuccess, userData, isError]);
  async function getRememberMe() {
    try {
      var value = await StorageService.get(StorageKeys.rememberMe);
      if (value) {
        const emails = await StorageService.get(StorageKeys.email);
        const passwords = await StorageService.get(StorageKeys.password);
        setrememberMe(JSON.parse(value));
        setEmail(emails);
        setPassword(passwords);
        await setValue('Email', emails);
        await setValue('Password', passwords);
      }
    } catch (error) {
      console.error('Error retrieving Remember Me flag:', error);
    }
  }
  // useFocusEffect(
  useEffect(() => {
    getRememberMe();
  }, []);
  // );

  // const handleNavigation = () => {
  //   navigate('ForgotPassword');
  // };
  return {
    isError,
    errorSection,
    control,
    EMAIL_REGEX,
    handleSubmit,
    onLoginClick,
    isLoading,
    error,
    errors,
    togleOn,
    rememberMe,
  };
}
