import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Layout from "../../layout/Layout";
import AlertDetailsView from "../../views/alert/alertDetails/AlertDetailsView";
import EventDetailsView from "../../views/event/eventDetails/EventDetailsView";
import UnitDetialsView from "../../views/unit/unitDetailsView/UnitDetailsView";
import { RootStackParamList } from "../routes/types";
import App from "../../../App";

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppStackProps {
    onLogout : () => void
}

const AppStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Layout} />
            <Stack.Screen name='AlertDetail' component={AlertDetailsView}/>
            <Stack.Screen name='EventDetail' component={EventDetailsView}/>
            <Stack.Screen name='UnitDetail' component={UnitDetialsView}/>
        </Stack.Navigator>
    )
}

export default AppStack