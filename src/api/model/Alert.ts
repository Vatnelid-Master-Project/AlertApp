import User from './User'
import Event from './Event'

type Alert = {
    key: number;
    users: User[];
    event: Event;
    isRead: boolean;
}

export default Alert