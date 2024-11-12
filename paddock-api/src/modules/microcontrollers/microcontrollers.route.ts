import { Router } from 'express';
import Controller from './microcontrollers.controller';
import { CreateMicrocontrollerDto } from '@/dto/microcontrollers.dto';
import RequestValidator from '@/middlewares/request-validator';
import { verifyAuthToken } from '@/middlewares/auth';

const microcontrollers: Router = Router();
const controller = new Controller();

/**
 * Create microcontroller body
 * @typedef {object} CreateMicrocontrollerBody
 * @property {string} name.required - name of microcontroller
 * @property {string} manufacturer - manufacturer of microcontroller
 * @property {string} masterChip - master chip of microcontroller
 * @property {string} loraChip - lora chip of microcontroller
 * @property {string} location - location of microcontroller
 * @property {string} serialNumber - serial number of microcontroller
 * @property {string} macAddress - mac address of microcontroller
 * @property {string} paddockId - paddock id of microcontroller
 */
/**
 * Microcontroller
 * @typedef {object} Microcontroller
 * @property {number} id - id of microcontroller
 * @property {string} name - name of microcontroller
 * @property {string} manufacturer - manufacturer of microcontroller
 * @property {string} masterChip - master chip of microcontroller
 * @property {string} loraChip - lora chip of microcontroller
 * @property {string} location - location of microcontroller
 * @property {string} serialNumber - serial number of microcontroller
 * @property {string} macAddress - mac address of microcontroller
 * @property {string} createdAt - created at of microcontroller
 * @property {string} updatedAt - updated at of microcontroller
 * @property {number} paddockId - paddock id of microcontroller
 */
/**
 * POST /microcontrollers/create
 * @summary Create microcontroller
 * @tags microcontrollers
 * @param {CreateMicrocontrollerBody} request.body.required
 * @return {Microcontroller} 201 - microcontroller created
 */
microcontrollers.post(
  '/create',
  verifyAuthToken,
  RequestValidator.validate(CreateMicrocontrollerDto),
  controller.createMicrocontroller
);

/**
 * GET /microcontrollers
 * @summary Get all microcontrollers
 * @tags microcontrollers
 * @return {Array.<Microcontroller>} 200 - microcontrollers
 */
microcontrollers.get('/', verifyAuthToken, controller.getAllMicrocontrollers);

export default microcontrollers;
