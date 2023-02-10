import EncryptedStorage from 'react-native-encrypted-storage';

export const StorageService = {
  setData: async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await EncryptedStorage.setItem(key, jsonValue);
    } catch (e) {}
  },
  getData: async (key: string) => {
    try {
      const value = await EncryptedStorage.getItem(key);
      return JSON.parse(value as any);
    } catch (e) {}
  },
  clearData: async () => {
    try {
      await EncryptedStorage.clear();
    } catch (e) {}
  },
};
