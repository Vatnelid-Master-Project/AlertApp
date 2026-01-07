import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInView from "../../views/login/LogInView";
import { RootStackParamList } from "../routes/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AuthStackProps {
    onLogin : () => void
}

const AuthStack = ({onLogin} : AuthStackProps) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login">
                {(props) => <LogInView {...props} onLogin={onLogin} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack