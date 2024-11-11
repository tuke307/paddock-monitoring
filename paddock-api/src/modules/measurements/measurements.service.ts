import { Measurement } from '@prisma/client';
import prisma from '@/lib/prisma';
import LogMessage from '@/decorators/log-message.decorator';

export default class MeasurementService {
  public async createMeasurement(data: Measurement): Promise<Measurement> {
    const measurement = await prisma.measurement.create({ data });
    return measurement;
  }

  public async getAllMeasurements(): Promise<Measurement[]> {
    const measurements = await prisma.measurement.findMany();
    return measurements;
  }
}
