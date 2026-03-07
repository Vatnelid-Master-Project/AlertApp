import Alert from './Alert'
import Unit from './Unit'

type Event = {
    key: number;
    unit: Unit;
    fall: boolean;
    eventOccurrence: string;
}

export default Event