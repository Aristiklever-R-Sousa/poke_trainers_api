import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import './config/database';
import dbInit from './database/migrations/init';

import routes from './routers/index';

const HOSTNAME = process.env.API_URL ?? 'http://localhost';
const PORT = process.env.PORT ?? 4000;

dbInit();

const server = express();

server.use(cors({
    origin: [...process.env.FRONT_URL?.split(',') ?? 'http://localhost:3001'],
}));
server.use(express.json());

server.use('/api', routes);

// Resposta padrão para quaisquer outras requisições:
server.use((req, res) => {
    res.status(404);
});


server.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}/api`);
});
