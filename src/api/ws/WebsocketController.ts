import {io} from 'socket.io-client'
import { wsUri } from '../../variables/ApiVariables'

class WebsocketController {
    socket = io(wsUri)

    public connect(){
        this.socket.on('connect', () => {
            console.log(`Connected to ${wsUri}`)
        })
    }

    public disconnect(){

    }

    public recive(){
        
    }

}

export default WebsocketController