import User from "./User";

class Devcie {
    key: number;
    user: User;
    remoteAddress: string;

    constructor(key: number, user: User, remoteAddress: string){
        this.key = key
        this.user = user
        this.remoteAddress = remoteAddress
    }
}

export default Devcie