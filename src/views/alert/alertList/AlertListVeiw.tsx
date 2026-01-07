import { FlatList, RefreshControl, Text } from "react-native"
import Alert from "../../../api/model/Alert"
import AlertListCard from "../../../common/component/listCard/AlertListCard"
import { useCallback, useEffect, useState } from "react"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeScreenProps, LogInScreenProps, RootStackParamList } from "../../../common/routes/types"
import { useNavigation } from "@react-navigation/native"
import { ApiController } from "../../../api/rest/ApiController"
import { Auth0Token } from "../../../common/hooks/useAccessToken"

interface AlertListProps {
    accessToken: Auth0Token
}

const AlertListView = ({accessToken} : AlertListProps) => {

    const [alerts, setAlerts] = useState<Alert[]>()
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const controller = new ApiController()
    const navigation = useNavigation<HomeScreenProps>();

    const fetchAlerts = useCallback(() => {
            setIsRefreshing(true)
            controller.fetchAlerts(accessToken).then(alerts => setAlerts(alerts))
            setIsRefreshing(false)
        }, [])

    useEffect(() => {
        fetchAlerts()
    }, [])

    const onPressHandler = (alert: Alert) => {
        navigation.navigate('AlertDetail', {alert})
    }

    return <FlatList
        data={alerts}
        keyExtractor={(item) => String(item.key)}
        renderItem={({item}) => <AlertListCard alert={item} onPress={() => onPressHandler(item)}/>}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchAlerts} />}
        />
}

export default AlertListView