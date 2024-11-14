import AsyncStorage from '@react-native-async-storage/async-storage';
// export const storage = __DEV__ ? new MMKVFaker() : new MMKV();
export const storage = AsyncStorage;

const StorageService = {
  get: async (key: any) => {
    let data = await AsyncStorage.getItem(key);
    return data === null || data === '' || data === undefined
      ? data
      : JSON.parse(data);
  },

  async set(key: any, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async clear(key: any) {
    await AsyncStorage.removeItem(key);
  },

  async clearAll() {
    // storage.clearAll();
    const keys = await AsyncStorage.getAllKeys();
    keys.map(item => {
      if (item !== 'password' && item !== 'rememberMe' && item !== 'email') {
        AsyncStorage.removeItem(item);
      }
    });
  },
};

export default StorageService;
