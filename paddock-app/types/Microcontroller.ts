interface Microcontroller {
    id: number;
    name: string;
    location: string;
    manufacturer: string;
    masterChip: string;
    loraChip: string | null;
    serialNumber: string;
    macAddress: string;
    createdAt: string;
    updatedAt: string;
    paddockId: number;
}

export default Microcontroller;