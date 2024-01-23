import { MMKV } from 'react-native-mmkv';
export const storage = new MMKV();

const StorageService = {
  get: (key: any) => {
    let data = storage.getString(key) || '';
    return data === '' || data === undefined ? data : JSON.parse(data);
  },

  set(key: any, value: any) {
    storage.set(key, JSON.stringify(value));
  },

  clear(key: any) {
    storage.delete(key);
  },

  clearAll() {
    storage.clearAll();
    const keys = storage.getAllKeys();

    console.log('keys', keys);
  },
};

export default StorageService;
