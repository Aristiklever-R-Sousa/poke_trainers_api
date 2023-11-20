import TrainerPokemon from '@models/TrainerPokemon';
import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/authMiddleware';
import Trainer from '@models/Trainer';
import { EagerLoadingError } from 'sequelize';

interface ITrainer {
    id: number,
    nickname: string,
}

export const listAssociatedPokemon = async (req: Request, res: Response) => {
    const trainer = (req as CustomRequest).token as ITrainer;

    try {

        const myPokes = await TrainerPokemon.findAll({
            include: [{ model: Trainer, attributes: [] }],
            where: {
                '$Trainer.nickname$': trainer.nickname,
            }
        });

        return res.json({ myPokes });

    } catch (err) {
        if (err instanceof EagerLoadingError) return res.status(500).json({ message: err.message });
        return res.status(500).json({ message: 'Ocorreu um erro...', err });
    }

};

export const associatePokeToTrainer = async (req: Request, res: Response) => {
    const trainer = (req as CustomRequest).token as ITrainer;
    // console.log({ trainer });

    try {
        req.body.pokemons.forEach(async (item: number) => {
            // console.log({ item });
            try {
                await TrainerPokemon.create({
                    TrainerId: trainer.id,
                    pokemonId: item,
                });
            } catch (err) {

            }
        });

        return res.status(201).json({ message: 'Associações feitas!' });
    } catch (err) {
        return res.status(500).json({ message: 'Ocorreu um erro...', err });
    }
};
