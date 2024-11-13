export enum SensorType {
    TEMPERATURE = 'TEMPERATURE',
}

interface Sensor {
    id: number;
    name: string;
    type: SensorType;
    location: string;
    createdAt: string;
    updatedAt: string;
    microcontrollerId: number;
}

export default Sensor;