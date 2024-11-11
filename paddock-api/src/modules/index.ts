import { Router } from 'express';

import sensors from './sensors/sensors.route';
import measurements from './measurements/measurements.route';
import microcontrollers from './microcontrollers/microcontrollers.route';

const router: Router = Router();

router.use('/sensors', sensors);
router.use('/measurements', measurements);
router.use('/microcontrollers', microcontrollers);

export default router;