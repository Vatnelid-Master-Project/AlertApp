import { View, Text } from "react-native"
import Event from "../../../api/model/Event"
import style from "./style"

interface EventListCardProps {
    event: Event | undefined
}

const EventListCard = ({event} : EventListCardProps) => {

    return <View style={style.card}>
        <View style={style.left_component}>
            <Text style={style.text}>Status: </Text>
        </View>
    </View>
}

export default EventListCard