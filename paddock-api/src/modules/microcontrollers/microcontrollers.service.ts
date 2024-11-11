import { Microcontroller } from '@prisma/client';
import prisma from '@/lib/prisma';
import LogMessage from '@/decorators/log-message.decorator';

export default class MicrocontrollerService {
  public async createMicrocontroller(
    data: Microcontroller
  ): Promise<Microcontroller> {
    console.log('Creating microcontroller');
    console.log(data);
    const microcontroller = await prisma.microcontroller.create({ data });
    return microcontroller;
  }

  public async getAllMicrocontrollers(): Promise<Microcontroller[]> {
    const microcontrollers = await prisma.microcontroller.findMany();
    return microcontrollers;
  }
}
