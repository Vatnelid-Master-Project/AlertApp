import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../common/routes/types";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "UnitDetail"
>

const UnitDetialsView = ({route, navigation}: Props) => {

    const {unit} = route.params

    return (
        <>
        </>
    )
}

export default UnitDetialsView