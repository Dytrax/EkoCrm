import { createStackNavigator } from "react-navigation";
import LoginScreen from "../src/containers/loginScreen";
import SecondScreen from "../src/containers/secondScreen";
import MyDrawer from "./RootStackDrawer";
const RootStack = createStackNavigator(
  {
    Home: {
      screen: LoginScreen,
      /* navigationOptions: () => ({
        header: null,
        

      }) */
       
    },
    Drawer: {
      screen: MyDrawer,
      /* navigationOptions: () => ({
        header: null,
        gesturesEnabled: false
        

      }) */
    },
  },
  {
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false

      })
  }

  
);

export default RootStack;
