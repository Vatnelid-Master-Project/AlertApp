import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../common/routes/types";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "EventDetail"
>

const EventDetailsView = ({route, navigation}: Props) => {

    const {event} = route.params

    return (
        <>
        </>
    )
}

export default EventDetailsView