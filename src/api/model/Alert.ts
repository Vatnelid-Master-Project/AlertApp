import User from './User'
import Event from './Event'

type Alert = {
    key: number;
    users: User[];
    event: Event;
    read: boolean;
}

export default Alert