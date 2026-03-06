import { useEffect, useState } from "react"
import { View, TextInput, Button, Alert } from "react-native"
import { ApiController } from "../../api/rest/ApiController"
import { LogInScreenProps } from "../../common/routes/types"
import { useNavigation } from "@react-navigation/native"
import * as SecureStore from "expo-secure-store";
import { apiKey } from "../../variables/ApiVariables"

type ApiKey = {
    apiKey: string
}

interface LogInProps {
    onLogin: () => void
}

const LogInView = ({onLogin} : LogInProps) => {

    const controller = new ApiController()

    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [apiKey, setApiKey] = useState<ApiKey | undefined>()
    
    const onChangeUsername = (username: string) => {
        setUserName(username)
    }

    const onChangePassword = (password: string) => {
        setPassword(password)
    }

    const handleLogIn = () => {
        controller.authenticate(userName, password).then((key : ApiKey) => {
            if (key.apiKey === ""){
                Alert.alert("Wrong password or username")
            } else {
                setApiKey(key)
            }
        })
    }

    useEffect(() => {

        if (apiKey !== undefined){
            const storeKey = async () => {
                await SecureStore.setItemAsync("apiKey", apiKey.apiKey)
            }
            storeKey()
            onLogin()
        }
            //navigation.navigate("Home", {apiKey: apiKey.apiKey})
        },[apiKey])

    return(
        <>
            <View>
                <TextInput placeholder="Input username" onChangeText={(text) => onChangeUsername(text)} />
                <TextInput placeholder="Input password" onChangeText={(text) => onChangePassword(text)}/>
                <Button title="Submit login" onPress={() => handleLogIn()}/>
            </View>
        </>
)        
}

export default LogInView