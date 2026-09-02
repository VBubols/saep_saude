import express from 'express';
import { cadastrar, login } from '../controllers/auth.controller.js';

const auth_router = express.Router();

auth_router.post('/cadastro', cadastrar);
auth_router.post('/login', login);

export default auth_router;