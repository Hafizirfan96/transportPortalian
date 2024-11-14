import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGeolocation, requestPermissions } from '@/services/Location';
import { Config } from '@/Config';
import axios from 'axios';
import { showToast } from '../appState';

export const getlocationApi = createAsyncThunk(
  'user/location',
  async (_, thunkAPI) => {
    try {
      await requestPermissions();
      const position = await fetchGeolocation();
      const API_KEY = Config.KEYS.API_KEY;
      const BASE_URL = Config.KEYS.BASE_URL;
      const response = await axios.get(
        `${BASE_URL}mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${API_KEY}`,
      );

      const locationName = response.data.features[0].place_name;
      return {
        location: locationName,
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
    } catch (error) {
      thunkAPI.dispatch(
        showToast({
          type: 'error',
          text1: 'Error Message',
          text2: error.message,
        }),
      );
      throw error;
    }
  },
);
