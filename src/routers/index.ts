import { Router } from 'express';

import authRoutes from './auth';
import trainerRotes from './trainers';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/', authMiddleware, trainerRotes);

export default router;
