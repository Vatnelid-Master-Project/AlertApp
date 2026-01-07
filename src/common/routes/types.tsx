import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import Alert from "../../api/model/Alert";
import Event from "../../api/model/Event";
import Unit from "../../api/model/Unit";

export type RootStackParamList = {
    Login: undefined;
    Home: {apiKey: string};
    AlertDetail: {alert: Alert};
    EventDetail: {event: Event};
    UnitDetail: {unit: Unit};
};

export type LogInScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>

export type HomeScreenProps = NativeStackNavigationProp<

 RootStackParamList,
 
 "Home"

>;


export type AlertDetailsViewProps = NativeStackNavigationProp<
 
 RootStackParamList,
 
 "AlertDetail"

>;

export type EventDetailsViewProps = NativeStackNavigationProp<
    RootStackParamList,
    "EventDetail"
>

export type UnitDetialsViewProps = NativeStackNavigationProp<
    RootStackParamList,
    "UnitDetail"
>

