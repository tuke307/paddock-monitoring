import { Sensor } from '@prisma/client';
import prisma from '@/lib/prisma';
import LogMessage from '@/decorators/log-message.decorator';

export default class SensorService {
  public async createSensor(data: Sensor): Promise<Sensor> {
    const sensor = await prisma.sensor.create({ data });
    return sensor;
  }

  public async getAllSensors(): Promise<Sensor[]> {
    const sensors = await prisma.sensor.findMany();
    return sensors;
  }

  public async getSensorsByMicrocontroller(microcontrollerId: number): Promise<Sensor[]> {
    const sensors = await prisma.sensor.findMany({
      where: {
        microcontrollerId,
      },
    });
    return sensors;
  }
}
