import express from 'express';
import { identificar } from '../middlewares/auth.middleware.js';
import { alternar } from '../controllers/curtida.controller.js';

const curtida_router = express.Router();

curtida_router.post('/:atividade_id/curtida', identificar, alternar);

export default curtida_router;
