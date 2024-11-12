import { Paddock } from '@prisma/client';
import prisma from '@/lib/prisma';
import LogMessage from '@/decorators/log-message.decorator';

export default class PaddockService {
  public async createPaddock(data: Paddock): Promise<Paddock> {
    const paddock = await prisma.paddock.create({ data });
    return paddock;
  }

  public async getAllPaddocks(): Promise<Paddock[]> {
    const paddocks = await prisma.paddock.findMany();
    return paddocks;
  }
}
