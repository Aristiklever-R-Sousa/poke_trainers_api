import { Trainer } from '@models/index';
const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
    Trainer.sync({ alter: isDev });
};
export default dbInit; 
