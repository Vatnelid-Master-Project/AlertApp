import ContactInfo from "./ContactInfo";
import Device from "./Device";

type Unit = {
    key: number;
    device: Device;
    unitName: string;
    unitIdentity: string;
    contactInfo: ContactInfo;
}

export default Unit