import Alert from './Alert'
import Unit from './Unit'

type Event = {
    key: number;
    unit: Unit;
    isFall: boolean;
    eventOccurrence: string;
}

export default Event