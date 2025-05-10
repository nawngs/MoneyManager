import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key: string): Promise<string | null> => {
  try {
    const val = await AsyncStorage.getItem(key);
    return val;
  } catch (error) {
    console.error(`Error getting item with key "${key}":`, error);
    return null;
  }
};