import express from 'express';
import { identificar, identificarOpcional } from '../middlewares/auth.middleware.js';
import { criar, listar } from '../controllers/atividade.controller.js';

const atividade_router = express.Router();

atividade_router.get('/', identificarOpcional, listar);
atividade_router.post('/', identificar, criar);

export default atividade_router;
