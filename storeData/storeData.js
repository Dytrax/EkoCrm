import { AsyncStorage } from "react-native"
class DB{
    async store(key,val)  {
        try {
          await AsyncStorage.setItem(key, val);
        } catch (error) {
          // Error saving data
          console.log(error)
        }
      }
     async getData(key) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            //console.log(value);
            return value
          }
         } catch (error) {
           // Error retrieving data
           console.log(error);
         }
      }
      async removeItemValue(key) {
        try {
          await AsyncStorage.removeItem(key);
          return true;
        }
        catch(exception) {
          return false;
        }
      }
}

export default new DB();