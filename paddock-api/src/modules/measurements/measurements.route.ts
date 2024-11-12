import { Router } from 'express';
import Controller from './measurements.controller';
import { CreateMeasurementDto } from '@/dto/measurement.dto';
import RequestValidator from '@/middlewares/request-validator';
import { verifyAuthToken } from '@/middlewares/auth';

const measurements: Router = Router();
const controller = new Controller();

/**
 * Create measurement body
 * @typedef {object} CreateMeasurementBody
 * @property {number} value.required - value of measurement
 * @property {number} sensorId.required - sensor id
 */
/**
 * Measurement
 * @typedef {object} Measurement
 * @property {number} id - id of measurement
 * @property {number} value - value of measurement
 * @property {string} createdAt - created at timestamp
 * @property {number} sensorId - sensor id
 */
/**
 * POST /measurements/create
 * @summary Create measurement
 * @tags measurements
 * @param {CreateMeasurementBody} request.body.required
 * @return {Measurement} 201 - measurement created
 */
measurements.post(
  '/create',
  verifyAuthToken,
  RequestValidator.validate(CreateMeasurementDto),
  controller.createMeasurement
);

/**
 * GET /measurements
 * @summary Get all measurements
 * @tags measurements
 * @return {Array.<Measurement>} 200 - measurements
 */
measurements.get('/', verifyAuthToken, controller.getAllMeasurements);

export default measurements;
