import { Pressable, Text, View } from "react-native"
import Alert from "../../../api/model/Alert"
import style from "./style"

interface AlertListCardProps {
    alert: Alert | undefined
    onPress: () => void
}

const AlertListCard = ({alert, onPress} : AlertListCardProps) => {

    return (
        <Pressable onPress={onPress} style={style.card}>
        <View style={style.left_component}>
            <Text style={style.text}>Date: </Text>
            <Text style={style.text}>{alert?.event.eventOccurrence}</Text>
        </View>

        <View style={style.left_component}>
            <Text style={style.text}>Seen: </Text>
            <Text style={style.text}>{alert?.isRead ? "Yes" : "No"}</Text>
        </View>

        <View style={style.left_component}>
            <Text style={style.text}>Unit: </Text>
            <Text style={style.text}>{alert?.event.unit.unitName}</Text>
        </View>
        </Pressable>
  );
}

export default AlertListCard