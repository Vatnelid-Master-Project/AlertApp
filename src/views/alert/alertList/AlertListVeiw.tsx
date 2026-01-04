import { FlatList, RefreshControl, Text } from "react-native"
import Alert from "../../../api/model/Alert"
import AlertListCard from "../../../common/component/listCard/AlertListCard"
import { useEffect } from "react"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeScreenProps, RootStackParamList } from "../../../common/routes/types"
import { useNavigation } from "@react-navigation/native"

interface AlertListProps {
    alerts: Alert[] | undefined
    onRefresh: () => void
    isRefreshing: boolean
}

const AlertListView = ({alerts, onRefresh, isRefreshing} : AlertListProps) => {

    const navigation = useNavigation<HomeScreenProps>();

    useEffect(() => {
        onRefresh();
    }, [])

    const onPressHandler = (alert: Alert) => {
        navigation.navigate('AlertDetail', {alert})
    }

    return <FlatList
        data={alerts}
        keyExtractor={(item) => String(item.key)}
        renderItem={({item}) => <AlertListCard alert={item} onPress={() => onPressHandler(item)}/>}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        />
}

export default AlertListView