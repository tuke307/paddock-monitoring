import { Router } from 'express';
import Controller from './sensors.controller';
import { CreateSensorDto } from '@/dto/sensor.dto';
import RequestValidator from '@/middlewares/request-validator';
import { verifyAuthToken } from '@/middlewares/auth';

const sensors: Router = Router();
const controller = new Controller();

/**
 * Create sensor body
 * @typedef {object} CreateSensorBody
 * @property {string} name.required - name of sensor
 * @property {string} type.required - type of sensor
 * @property {string} location - location of sensor
 * @property {number} microcontrollerId.required - microcontroller id of sensor
 */
/**
 * Sensor
 * @typedef {object} Sensor
 * @property {number} id - id of sensor
 * @property {string} name - name of sensor
 * @property {string} type - type of sensor
 * @property {string} location - location of sensor
 * @property {string} createdAt - created at of sensor
 * @property {string} updatedAt - updated at of sensor
 * @property {number} microcontrollerId - microcontroller id of sensor
 */
/**
 * POST /sensors/create
 * @summary Create sensor
 * @tags sensors
 * @param {CreateSensorBody} request.body.required
 * @return {Sensor} 201 - sensor created
 */
sensors.post(
  '/create',
  verifyAuthToken,
  RequestValidator.validate(CreateSensorDto),
  controller.createSensor
);

/**
 * GET /sensors
 * @summary Get all sensors
 * @tags sensors
 * @param {number} [microcontrollerId.query] - Optional microcontroller ID to filter sensors
 * @return {Array.<Sensor>} 200 - sensors
 */
sensors.get('/', verifyAuthToken, controller.getAllSensors);

export default sensors;
