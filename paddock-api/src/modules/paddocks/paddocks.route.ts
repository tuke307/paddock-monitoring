import { Router } from 'express';
import Controller from './paddocks.controller';
import { CreatePaddockDto } from '@/dto/paddock.dto';
import RequestValidator from '@/middlewares/request-validator';
import { verifyAuthToken } from '@/middlewares/auth';

const paddocks: Router = Router();
const controller = new Controller();

/**
 * Create paddock body
 * @typedef {object} CreatePaddockBody
 * @property {string} name.required - name of paddock
 * @property {string} description.required - description of paddock
 * @property {string} shape - shape of paddock
 */
/**
 * Paddock
 * @typedef {object} Paddock
 * @property {number} id - id of paddock
 * @property {string} name - name of paddock
 * @property {string} description - description of paddock
 * @property {string} shape - shape of paddock
 * @property {string} createdAt - created at of paddock
 * @property {string} updatedAt - updated at of paddock
 */
/**
 * POST /paddocks/create
 * @summary Create paddock
 * @tags paddocks
 * @param {CreatePaddockBody} request.body.required
 * @return {Paddock} 201 - paddock created
 */
paddocks.post(
  '/create',
  verifyAuthToken,
  RequestValidator.validate(CreatePaddockDto),
  controller.createPaddock
);

/**
 * GET /paddocks
 * @summary Get all paddocks
 * @tags paddocks
 * @return {Array.<Paddock>} 200 - paddocks
 */
paddocks.get('/', verifyAuthToken, controller.getAllPaddocks);

export default paddocks;
