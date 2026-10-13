import express from 'express';
import { mostrarEmpresa } from '../controllers/empresa.controller.js';

const empresa_router = express.Router();

empresa_router.get('/', mostrarEmpresa);

export default empresa_router;
