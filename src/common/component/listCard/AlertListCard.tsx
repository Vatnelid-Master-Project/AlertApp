import { Text, View } from "react-native"
import Alert from "../../../api/model/Alert"
import style from "./style"

interface AlertListCardProps {
    alert: Alert | undefined
}

const AlertListCard = ({alert} : AlertListCardProps) => {

    return <View style={style.card}>
        <View style={style.left_component}>
            <Text style={style.text}>Status: </Text>
            <Text style={style.text}>{alert?.event.isFall}</Text>
        </View>
        <View style={style.left_component}>
            <Text style={style.text}>Seen: </Text>
            <Text style={style.text}>{alert?.isRead === true ? "Yes" : "No"}</Text>
        </View>
        <View style={style.left_component}>
            <Text style={style.text}>Unit: </Text>
            <Text style={style.text}>{alert?.event.unit.unitName}</Text>
        </View>
    </View>
}

export default AlertListCard