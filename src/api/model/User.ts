import Alert from "./Alert"

export default class User {
    key: number;
    username: string;
    fullname: string;
    alerts: Alert[];

    constructor(key: number, username: string, fullname: string, alerts: Alert[]){
        this.key = key
        this.username = username
        this.fullname = fullname
        this.alerts = alerts
    }
}