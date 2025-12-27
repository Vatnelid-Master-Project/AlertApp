import User from './User'
import Event from './Event'

export default class Alert {
    private key: number;
    private users: User[];
    private event: Event;
    private isRead: boolean;

    constructor(key: number, users: User[], event: Event, isRead: boolean){
        this.key = key
        this.users = users
        this.event = event
        this.isRead = isRead
    }

    getKey(): number {
        return this.key
    }

    getUsers(): User[] {
        return this.users
    }

    getEvent(): Event {
        return this.event
    }

    getIsRead(): boolean {
        return this.isRead
    }

}