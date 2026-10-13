import express from 'express';
import { identificar } from '../middlewares/auth.middleware.js';
import { mostrarPerfil } from '../controllers/usuario.controller.js';

const usuario_router = express.Router();

usuario_router.get('/perfil', identificar, mostrarPerfil);

export default usuario_router;
