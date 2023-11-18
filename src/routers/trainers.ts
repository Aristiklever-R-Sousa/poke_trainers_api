import * as trainerController from '@controllers/pokemonTrainerController';
import express from 'express';

const router = express.Router();

router.post('/associate-pokemon-trainer', trainerController.associatePokeToTrainer);
router.get('/list-associated-pokemons', trainerController.listAssociatedPokemon);

export default router;
