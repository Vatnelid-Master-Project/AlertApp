import Device from "./Device";

class Unit {
    key: number;
    device: Device;
    unitName: string;
    unitIdentity: string;

    constructor(key: number, device: Device, unitName: string, unitIdentity: string){
        this.key = key
        this.device = device
        this.unitName = unitName
        this.unitIdentity = unitIdentity
    }
}

export default Unit