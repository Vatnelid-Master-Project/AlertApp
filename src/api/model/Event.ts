import Alert from './Alert'
import Unit from './Unit'

type Event = {
    key: number;
    unit: Unit;
    isFall: boolean;
    eventOccurrance: Date;
}

export default Event