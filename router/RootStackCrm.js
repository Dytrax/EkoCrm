import { createStackNavigator, } from "react-navigation";
import TabsCrm from "./RootStackTab"
import ActivityResetPrueba from "../src/containers/ActivityResetPrueba";
import CreateClientV2 from "../src/containers/tabsCRM/createClientV2";
import EditClientV2 from "../src/containers/tabsCRM/editClientV2";
import CreateContactV2 from "../src/containers/tabsCRM/createContactV2";
import EditConctactV2 from "../src/containers/tabsCRM/editContactV2";

const RootStackSolicitud = createStackNavigator(
  {
    TabCRM:{ screen: TabsCrm},
    ActivityReset: { screen: ActivityResetPrueba},
    CreateContact: {screen: CreateContactV2},
    EditContact: {screen: EditConctactV2},
    CreateClient: { screen: CreateClientV2},
    EditClient: { screen: EditClientV2}
  },
  {
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false
        
      })
  }

  
);

export default RootStackSolicitud;
