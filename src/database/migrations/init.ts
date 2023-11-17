import { Trainer, TrainerPokemon } from '@models/index';
const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
    Trainer.sync({ alter: isDev });
    TrainerPokemon.sync({ alter: isDev });
};

export default dbInit; 
