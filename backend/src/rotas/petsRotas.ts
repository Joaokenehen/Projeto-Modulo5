import express from 'express';
import { buscarTodosPets, buscarPetPorId, criarNovoPet, atualizarDadosPet, deletarPet } from '../controllers/PetsController';

const router = express.Router();

router.get('/pets', buscarTodosPets);
router.get('/pets/:id', buscarPetPorId);
router.post('/pets', criarNovoPet);
router.patch('/pets/:id', atualizarDadosPet);
router.delete('/pets/:id', deletarPet);


export default router;