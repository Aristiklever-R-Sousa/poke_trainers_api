import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import './config/database';
import dbInit from './database/migrations/init';

import routes from './routers/index';

dbInit();

const HOSTNAME = process.env.API_URL ?? 'http://localhost';
const PORT = process.env.PORT ?? 4000;

const server = express();

server.use(cors({
    origin: [process.env.FRONT_URL ?? 'http://localhost:3000'],
}));

server.use('/api', routes);

// Resposta padrão para quaisquer outras requisições:
server.use((req, res) => {
    res.status(404);
});


server.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}/api`);
});
