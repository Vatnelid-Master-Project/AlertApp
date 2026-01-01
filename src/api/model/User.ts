import Alert from "./Alert"

type User = {
    key: number;
    username: string;
    fullname: string;
    alerts: Alert[];
}

export default User