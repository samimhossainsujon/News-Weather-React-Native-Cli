import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error storing data", error);
        throw error; 
    }
};

export const getData = async (key: string): Promise<any | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
        return null; 
    } catch (error) {
        console.error("Error retrieving data", error);
        throw error; 
    }
};