import { View, Text } from "react-native"
import Alert from "../../../api/model/Alert"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../common/routes/types"

type Props = NativeStackScreenProps<
    RootStackParamList,
    "AlertDetail"
>

const AlertDetailsView = ({route, navigation} : Props) => {

    const {alert} = route.params;

    return (
        <>
            <View>
                <Text>Hello Alert Detials veiw</Text>
            </View>
            <View>
                <Text>Date </Text>
                <Text>{alert.event.eventOccurrence}</Text>
            </View>
        </>
    )
}

export default AlertDetailsView