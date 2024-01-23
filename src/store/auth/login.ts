import { createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import { Config } from '@/config';
import { authService } from '@/services/auth';
import TokenStorage from '@/services/TokenStorageService';
import { navigateAndSimpleReset } from '@/navigators/Root';

export const login = createAsyncThunk(
  'verify/login',
  async (args: any, thunkAPI) => {
    try {
      const { username, password, deviceId } = args;
      var data: any = {
        UserName: (username || '').toLowerCase(),
        Password: password,
        GrantType: 'password',
        ClientId: Config.CLIENT_ID,
        ClientSecret: Config.CLIENT_SECRET,
        Scope: deviceId,
        AppVersion: Config.APP_VERSION,
        OsVersion: Platform.OS + '-' + Platform.Version,
      };
      const result = await authService.exchangeToken(data);
      if (result) {
        TokenStorage.storeTokenInfo(
          result.AccessToken,
          result.RefreshToken,
          result.UserId,
          result.UserName,
        );
        navigateAndSimpleReset('Main');
      }
      return result;
    } catch (error) {
      if (error.response.data.error && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);
