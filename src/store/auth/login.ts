import { createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import { Config } from '@/config';
import { authService } from '@/services/Auth';
import TokenStorage from '../../services/TokenStorageService';
import { navigateAndSimpleReset } from '@/navigators/Root';
import { fetchGeolocation, requestPermissions } from '@/services/Location';
import { showToast } from '../appState';
import { setlocation } from '../location';
import { store } from '..';
import axios from 'axios';
import { getMyVehicles } from '@/store/vehicle/vehicleInfo';
import { tourInfo } from '@/store/tour/tourInfo';
import { VehicleSearchModel } from '@/interfaces';

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
      const searchQuery: VehicleSearchModel = {
        CurrentPage: 1,
        PageSize: 20,
        SortOrder: 'ASC',
        SortBy: 'Name',
        SearchTerm: '',
        IsLorry: false,
      };
      const result = await authService.exchangeToken(data);
      if (result) {
        await TokenStorage.storeTokenInfo(
          result.AccessToken,
          result.RefreshToken,
          result.UserId,
          result.UserName,
        );
        //   await requestPermissions()
        //   const position = await fetchGeolocation();

        await requestPermissions();
        const position = await fetchGeolocation();
        const API_KEY = Config.KEYS.API_KEY;
        const BASE_URL = Config.KEYS.BASE_URL;
        const response = await axios.get(
          `${BASE_URL}mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${API_KEY}`,
        );

        const locationName = response.data.features[0].place_name;
        // console.log(locationName);
        thunkAPI.dispatch(
          setlocation({
            location: locationName,
            lat: position.coords.latitude,
            long: position.coords.longitude,
          }),
        );
        thunkAPI.dispatch(getMyVehicles(searchQuery));
        thunkAPI.dispatch(tourInfo());
        navigateAndSimpleReset('Main');
      }
      return result;
    } catch (error) {
      if (error.response.data.error && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        thunkAPI.dispatch(
          showToast({
            type: 'error',
            text1: 'Error Message',
            text2: errorMessage,
          }),
        );
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);
