import { View, Text, Pressable } from "react-native";
import Unit from "../../../api/model/Unit";
import style from "./style";

interface UnitListCardProps {
    unit: Unit | undefined
    onPress: () => void
}

const UnitListCard = ({unit, onPress} : UnitListCardProps) => {

    return (
    <Pressable onPress={onPress}>
        <View style={style.card}>
            <View style={style.left_component}>
                <Text style={style.text}>Name: </Text>
                <Text style={style.text}>{unit?.unitName}</Text>
            </View>
        </View>
    </Pressable>
        )
}

export default UnitListCard