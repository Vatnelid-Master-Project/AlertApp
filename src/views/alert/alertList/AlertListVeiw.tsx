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

    const [alerts, setAlerts] = useState<Alert[]>([])
    const [lastDate, setLastDate] = useState<String>("")
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const controller = new ApiController()
    const navigation = useNavigation<HomeScreenProps>();

    const fetchAlerts = useCallback(() => {
            setIsRefreshing(true)
            console.log(lastDate)
            controller.fetchAlerts(accessToken, lastDate).then(alerts => 
                setAlerts(prev => prev.concat(alerts))
            )
            const currentlastDate = new Date (alerts[alerts?.length - 1]?.event?.eventOccurrence)
            const currentMonth = currentlastDate.getMonth() + 1
            
            const lastDateString = 
                currentlastDate.getFullYear() + 
                "-" + currentMonth + 
                "-" + currentlastDate.getDate() + "T" +
                currentlastDate.getHours() + 
                ":" + currentlastDate.getMinutes() + 
                ":" + currentlastDate.getSeconds()

            
            setLastDate(lastDateString)
            setIsRefreshing(false)
        }, [accessToken, lastDate, controller])

    useEffect(() => {
        if (lastDate === ""){
            const currentDate = new Date()
            const currentMonth = currentDate.getMonth() + 1

            const currentDateString = 
            currentDate.getFullYear()
            + "-" 
            + currentMonth
            + "-"
            + currentDate.getDate()
            + "T023:59:59"
            console.log(currentDateString);
            setLastDate(currentDateString)
        }
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