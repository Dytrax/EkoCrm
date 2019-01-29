import { createStackNavigator, } from "react-navigation";
import CalendarScreen from "../src/containers/calendarScreen"
import Profile from "../src/containers/profileScreen";


const RootStackProfile = createStackNavigator(
  {
    ProfileScreen:{ screen: Profile},
    
  },
  /* {
    ActivitiesDayScreen:{ screen: OpportunityOfDayScreen}
  }, */
  {
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false
        
      })
  }

  
);

export default RootStackProfile;