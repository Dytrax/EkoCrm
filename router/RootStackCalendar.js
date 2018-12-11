import { createStackNavigator, } from "react-navigation";
import CalendarScreen from "../src/containers/calendarScreen"
import OpportunityOfDayScreen from "../src/containers/opportunityOfDayScreen";

const RootStackCalendar = createStackNavigator(
  {
    CalendarScreen:{ screen: CalendarScreen},
    OpportunityOfDayScreen:{ screen: OpportunityOfDayScreen}
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

export default RootStackCalendar;