import { type NextFunction, type Request } from 'express';
import { Sensor } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import SensorService from './sensors.service';
import { type CustomResponse } from '@/types/common.type';
import Api from '@/lib/api';

export default class SensorController extends Api {
  private readonly sensorService = new SensorService();

  public createSensor = async (
    req: Request,
    res: CustomResponse<Sensor>,
    next: NextFunction
  ) => {
    try {
      const sensor = await this.sensorService.createSensor(req.body);
      this.send(res, sensor, HttpStatusCode.Created, 'createSensor');
    } catch (e) {
      next(e);
    }
  };

  public getAllSensors = async (
    req: Request,
    res: CustomResponse<Sensor[]>,
    next: NextFunction
  ) => {
    try {
      const sensors = await this.sensorService.getAllSensors();
      this.send(res, sensors, HttpStatusCode.Ok, 'getAllSensors');
    } catch (e) {
      next(e);
    }
  };
}
