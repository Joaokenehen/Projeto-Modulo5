import { Request, Response, Router } from 'express';
import { login } from '../controllers/AutenticacaoController';

const router = Router();

router.post('/login', login);

export default router;