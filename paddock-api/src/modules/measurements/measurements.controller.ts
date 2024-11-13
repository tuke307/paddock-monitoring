import { type NextFunction, type Request } from 'express';
import { Measurement } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import MeasurementService from './measurements.service';
import { type CustomResponse } from '@/types/common.type';
import Api from '@/lib/api';

export default class MeasurementController extends Api {
  private readonly measurementService = new MeasurementService();

  public createMeasurement = async (
    req: Request,
    res: CustomResponse<Measurement>,
    next: NextFunction
  ) => {
    try {
      const measurement = await this.measurementService.createMeasurement(
        req.body
      );
      this.send(res, measurement, HttpStatusCode.Created, 'createMeasurement');
    } catch (e) {
      next(e);
    }
  };

  public getAllMeasurements = async (
    req: Request,
    res: CustomResponse<Measurement[]>,
    next: NextFunction
  ) => {
    try {
      const measurements = await this.measurementService.getAllMeasurements();
      this.send(res, measurements, HttpStatusCode.Ok, 'getAllMeasurements');
    } catch (e) {
      next(e);
    }
  };

  public getMeasurementsBySensor = async (
    req: Request,
    res: CustomResponse<Measurement[]>,
    next: NextFunction
  ) => {
    try {
      const sensorId = parseInt(req.params.sensorId, 10);
      const measurements = await this.measurementService.getMeasurementsBySensor(
        sensorId
      );
      this.send(res, measurements, HttpStatusCode.Ok, 'getMeasurementsBySensor');
    } catch (e) {
      next(e);
    }
  }

  public getNewestMeasurementBySensor = async (
    req: Request,
    res: CustomResponse<Measurement | null>,
    next: NextFunction
  ) => {
    try {
      const sensorId = parseInt(req.params.sensorId, 10);
      const measurement = await this.measurementService.getNewestMeasurementBySensor(
        sensorId
      );
      this.send(res, measurement, HttpStatusCode.Ok, 'getNewestMeasurementBySensor');
    } catch (e) {
      next(e);
    }
  }
}
