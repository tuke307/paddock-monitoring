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
      const sensorId = req.query.sensorId ? parseInt(req.query.sensorId as string, 10) : null;
      let measurements: Measurement[];

      if (sensorId) {
        measurements = await this.measurementService.getMeasurementsBySensor(sensorId);
      } else {
        measurements = await this.measurementService.getAllMeasurements();
      }

      this.send(res, measurements, HttpStatusCode.Ok, 'getAllMeasurements');
    } catch (e) {
      next(e);
    }
  };

  public getNewestMeasurement = async (
    req: Request,
    res: CustomResponse<Measurement | null>,
    next: NextFunction
  ) => {
    try {
      const sensorId = req.query.sensorId ? parseInt(req.query.sensorId as string, 10) : null;
      let measurement: Measurement | null;

      if (sensorId) {
        measurement = await this.measurementService.getNewestMeasurementBySensor(sensorId);
      } else {
        measurement = await this.measurementService.getNewestMeasurement();
      }

      this.send(res, measurement, HttpStatusCode.Ok, 'getNewestMeasurement');
    } catch (e) {
      next(e);
    }
  }
}
