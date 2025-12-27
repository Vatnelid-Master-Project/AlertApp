import Alert from './Alert'
import Unit from './Unit'

class Event {
    key: number;
    unit: Unit;
    isFall: boolean;
    eventOccurrance: Date;

    constructor(key: number, unit: Unit, isFall: boolean, eventOccurance: Date){
        this.key = key
        this.unit = unit
        this.isFall = isFall
        this.eventOccurrance = eventOccurance
    }
}

export default Event