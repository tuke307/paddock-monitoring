import { type NextFunction, type Request } from 'express';
import { Microcontroller } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import MicrocontrollerService from './microcontrollers.service';
import { type CustomResponse } from '@/types/common.type';
import Api from '@/lib/api';

export default class MicrocontrollerController extends Api {
  private readonly microcontrollerService = new MicrocontrollerService();

  public createMicrocontroller = async (
    req: Request,
    res: CustomResponse<Microcontroller>,
    next: NextFunction
  ) => {
    try {
      const microcontroller =
        await this.microcontrollerService.createMicrocontroller(req.body);
      this.send(
        res,
        microcontroller,
        HttpStatusCode.Created,
        'createMicrocontroller'
      );
    } catch (e) {
      next(e);
    }
  };

  public getAllMicrocontrollers = async (
    req: Request,
    res: CustomResponse<Microcontroller[]>,
    next: NextFunction
  ) => {
    try {
      const microcontrollers =
        await this.microcontrollerService.getAllMicrocontrollers();
      this.send(
        res,
        microcontrollers,
        HttpStatusCode.Ok,
        'getAllMicrocontrollers'
      );
    } catch (e) {
      next(e);
    }
  };
}
