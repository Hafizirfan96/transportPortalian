import { MMKV } from 'react-native-mmkv';

import { Config } from '@/config';
export const storage = new MMKV();

const LOCAL_STORAGE_TOKEN = Config.KEYS.ACCESS_TOKEN;
const LOCAL_STORAGE_REFRESH_TOKEN = Config.KEYS.REFRESH_TOKEN;
const LOCAL_STORAGE_USER_NAME = Config.KEYS.USER_NAME;
const LOCAL_STORAGE_USER_ID = Config.KEYS.USER_ID;

const TokenStorage = {
  isAuthenticated: () => {
    var token = storage.getString(LOCAL_STORAGE_TOKEN);
    return token !== undefined;
  },
  getToken() {
    var token = storage.getString(LOCAL_STORAGE_TOKEN);
    return token;
  },

  getAuthentication: () => {
    return {
      headers: { Authorization: 'Bearer ' + this.getToken() },
    };
  },

  showAll() {
    // storage.getAllKeys((err, keys) => {
    //   storage.multiGet(keys, (error, stores) => {
    //     stores.map((result, i, store) => {
    //       console.log({ [store[i][0]]: store[i][1] });
    //       return true;
    //     });
    //   });
    // });
  },

  storeTokenInfo(token, refreshToken, userId, userName) {
    this.storeToken(token);
    this.storeRefreshToken(refreshToken);
    this.userId(userId);
    storage.set(LOCAL_STORAGE_USER_ID, userId);
    storage.set(LOCAL_STORAGE_USER_NAME, userName);
  },

  storeToken(token) {
    storage.set(LOCAL_STORAGE_TOKEN, token);
  },

  storeRefreshToken(refreshToken) {
    storage.set(LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
  },
  userId(userId) {
    storage.set(LOCAL_STORAGE_USER_ID, userId);
  },

  clear() {
    storage.removeItem(LOCAL_STORAGE_TOKEN);
    storage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
    storage.removeItem(LOCAL_STORAGE_USER_NAME);
  },

  getRefreshToken() {
    var refreshToken = storage.getString(LOCAL_STORAGE_REFRESH_TOKEN);
    return refreshToken;
  },

  getUsername() {
    var userName = storage.getString(LOCAL_STORAGE_USER_NAME);
    return userName;
  },

  getUserId() {
    var userId = storage.getString(LOCAL_STORAGE_USER_ID);
    return userId;
  },

  GetAllTokenInfo() {
    var info = {
      username: this.getUsername(),
      token: this.getToken(),
      refreshToken: this.getRefreshToken(),
      userId: this.getUserId(),
    };
    return info;
  },
};

export default TokenStorage;
