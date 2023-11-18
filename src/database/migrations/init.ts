import { Trainer, TrainerPokemon } from '@models/index';
const isDev = process.env.NODE_ENV === 'development';

const dbInit = async () => {
    await Trainer.sync({ alter: isDev });
    await TrainerPokemon.sync({ alter: isDev });
};

export default dbInit; 
