import { View, Text, Pressable } from "react-native"
import Event from "../../../api/model/Event"
import style from "./style"

interface EventListCardProps {
    event: Event | undefined
    onPress: () => void
}

const EventListCard = ({event, onPress} : EventListCardProps) => {

    return (
    <Pressable onPress={onPress}>
        <View style={style.card}>
            <View style={style.left_component}>
                <Text style={style.text}>Status: </Text>
                <Text style={style.text}>{event?.isFall ? "Fall" : "Not fall"}</Text>
            </View>
            <View style={style.left_component}>
                <Text style={style.text}>Date: </Text>
                <Text style={style.text}>{event?.eventOccurrence}</Text>
            </View>
            <View style={style.left_component}>
                <Text style={style.text}>Phonenumber: </Text>
                <Text style={style.text}>{event?.unit.contactInfo.phoneNumber}</Text>
            </View>
            <View style={style.left_component}>
                <Text style={style.text}>Address: </Text>
                <Text style={style.text}>{event?.unit.contactInfo.address}</Text>
            </View>
            <View style={style.left_component}>
                <Text style={style.text}>City: </Text>
                <Text style={style.text}>{event?.unit.contactInfo.city}</Text>
            </View>
            <View style={style.left_component}>
                <Text style={style.text}>ZipCode: </Text>
                <Text style={style.text}>{event?.unit.contactInfo.zipCode}</Text>
            </View>
        </View>
    </Pressable>
    )
}

export default EventListCard