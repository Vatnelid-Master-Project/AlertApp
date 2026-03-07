import { FlatList, RefreshControl, Text } from "react-native"
import Alert from "../../../api/model/Alert"
import AlertListCard from "../../../common/component/listCard/AlertListCard"
import { useCallback, useEffect, useRef, useState } from "react"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeScreenProps, LogInScreenProps, RootStackParamList } from "../../../common/routes/types"
import { useNavigation } from "@react-navigation/native"
import { ApiController } from "../../../api/rest/ApiController"
import { Auth0Token } from "../../../common/hooks/useAccessToken"

interface AlertListProps {
    accessToken: Auth0Token
}

const AlertListView = ({accessToken} : AlertListProps) => {

    const [alerts, setAlerts] = useState<Alert[]>([])
    const [lastDate, setLastDate] = useState<string>(() => {
        // Initialize with today's date immediately, avoiding the empty string issue
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1
        return (
            currentDate.getFullYear() +
            "-" + currentMonth +
            "-" + currentDate.getDate() +
            "T23:59:59"
        )
    })
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const navigation = useNavigation<HomeScreenProps>();

    // Prevent controller from being recreated on every render
    const controller = useRef(new ApiController()).current

    const formatDate = (date: Date): string => {
        const month = date.getMonth() + 1
        return (
            date.getFullYear() +
            "-" + month +
            "-" + date.getDate() +
            "T" + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds()
        )
    }

    const fetchAlerts = useCallback(() => {
        setIsRefreshing(true)
        controller.fetchAlerts(accessToken, lastDate)
            .then((newAlerts : Alert[]) => {
                if (newAlerts.length > 0) {
                    // Append new events to existing list
                    setAlerts(prev => [...prev, ...newAlerts])

                    // Update lastDate from the last fetched event, inside .then() so data is available
                    const lastAlert = newAlerts[newAlerts.length - 1]
                    const lastEventDate = new Date(lastAlert.event.eventOccurrence)
                    setLastDate(formatDate(lastEventDate))
                }
            })
            .finally(() => {
                setIsRefreshing(false)
            })
    }, [accessToken, lastDate, controller])

    useEffect(() => {
        fetchAlerts()
    }, []) // Runs once on mount; lastDate is already initialized above

    const onPressHandler = (alert: Alert) => {
        navigation.navigate('AlertDetail', {alert})
    }

    return (
        <FlatList
            data={alerts}
            keyExtractor={(item) => item.key?.toString()}
            renderItem={({item}) => (
                <AlertListCard alert={item} onPress={() => onPressHandler(item)}/>
            )}
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={fetchAlerts}/>
            }
        />
    )
}

export default AlertListView