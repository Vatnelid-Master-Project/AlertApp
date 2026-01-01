import { FlatList, Text } from "react-native"
import Alert from "../../../api/model/Alert"
import AlertListCard from "../../../common/component/listCard/AlertListCard"

interface AlertListProps {
    alerts: Alert[] | undefined
}

const AlertListView = ({alerts} : AlertListProps) => {

    return <FlatList
        data={alerts}
        renderItem={({item}) => <AlertListCard alert={item}/>}
        />
}

export default AlertListView