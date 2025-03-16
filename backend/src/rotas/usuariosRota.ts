import express from 'express';
import { buscarTodosUsuarios, buscarUsuarioPorId, criarUsuario, atualizarUsuario, deletarUsuario } from '../controllers/UsuariosController';

const router = express.Router();

router.get('/usuarios', buscarTodosUsuarios);
router.get('/usuarios/:id', buscarUsuarioPorId);
router.post('/usuarios', criarUsuario);
router.patch('/usuarios/:id', atualizarUsuario);
router.delete('/usuarios/:id', deletarUsuario);

export default router;