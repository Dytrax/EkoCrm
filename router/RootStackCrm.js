import { createStackNavigator, } from "react-navigation";
import TabsCrm from "./RootStackTab"

const RootStackSolicitud = createStackNavigator(
  {
    TabCRM:{ screen: TabsCrm},
    
  },
  {
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false
        
      })
  }

  
);

export default RootStackSolicitud;
