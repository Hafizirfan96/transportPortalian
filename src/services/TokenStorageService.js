import { Config } from '@/config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
// export const storage = __DEV__? new MMKVFaker() : new MMKV();
export const storage = AsyncStorage;

const LOCAL_STORAGE_TOKEN = Config.KEYS.ACCESS_TOKEN;
const LOCAL_STORAGE_REFRESH_TOKEN = Config.KEYS.REFRESH_TOKEN;
const LOCAL_STORAGE_USER_NAME = Config.KEYS.USER_NAME;
const LOCAL_STORAGE_USER_ID = Config.KEYS.USER_ID;

const TokenStorage = {
  isAuthenticated: async () => {
    var token = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN);
    return token !== undefined && token !== null;
  },
  async getToken() {
    var token = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN);
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

  async storeTokenInfo(token, refreshToken, userId, userName) {
    this.storeToken(token);
    this.storeRefreshToken(refreshToken);
    this.userId(userId);
    await AsyncStorage.setItem(LOCAL_STORAGE_USER_ID, userId);
    await AsyncStorage.setItem(LOCAL_STORAGE_USER_NAME, userName);
  },

  async storeToken(token) {
    await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  },

  async storeRefreshToken(refreshToken) {
    await AsyncStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
  },
  async userId(userId) {
    await AsyncStorage.setItem(LOCAL_STORAGE_USER_ID, userId);
  },

  async clear() {
    await AsyncStorage.removeItem(LOCAL_STORAGE_TOKEN);
    await AsyncStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
    await AsyncStorage.removeItem(LOCAL_STORAGE_USER_NAME);
  },

  async getRefreshToken() {
    var refreshToken = await AsyncStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
    return refreshToken;
  },

  async getUsername() {
    var userName = await AsyncStorage.getItem(LOCAL_STORAGE_USER_NAME);
    return userName;
  },

  async getUserId() {
    var userId = await AsyncStorage.getItem(LOCAL_STORAGE_USER_ID);
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
