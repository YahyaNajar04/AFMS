import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key , value);
      } catch (e) {
        console.error("Error saving data", e);
      }
    };

    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // value previously stored
        }
      } catch (e) {
        console.error("Error reading data", e);
      }
    };

export default {
      storeData, 
      getData
}