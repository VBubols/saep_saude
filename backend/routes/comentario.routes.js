import express from 'express';
import { identificar } from '../middlewares/auth.middleware.js';
import { criar, listar } from '../controllers/comentario.controller.js';

const comentario_router = express.Router();

comentario_router.get('/:atividade_id/comentarios', listar);
comentario_router.post('/:atividade_id/comentarios', identificar, criar);

export default comentario_router;
