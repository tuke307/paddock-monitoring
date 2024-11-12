import { type NextFunction, type Request } from 'express';
import { Paddock } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import PaddockService from './paddocks.service';
import { type CustomResponse } from '@/types/common.type';
import Api from '@/lib/api';

export default class PaddockController extends Api {
  private readonly paddockService = new PaddockService();

  public createPaddock = async (
    req: Request,
    res: CustomResponse<Paddock>,
    next: NextFunction
  ) => {
    try {
      const paddock = await this.paddockService.createPaddock(req.body);
      this.send(res, paddock, HttpStatusCode.Created, 'createPaddock');
    } catch (e) {
      next(e);
    }
  };

  public getAllPaddocks = async (
    req: Request,
    res: CustomResponse<Paddock[]>,
    next: NextFunction
  ) => {
    try {
      const paddocks = await this.paddockService.getAllPaddocks();
      this.send(res, paddocks, HttpStatusCode.Ok, 'getAllPaddocks');
    } catch (e) {
      next(e);
    }
  };
}
