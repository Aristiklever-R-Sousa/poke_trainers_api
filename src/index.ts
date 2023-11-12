import 'dotenv/config';
import './config/database';

import express from 'express';
import cors from 'cors';

import routes from './routers/index';

const PORT = process.env.PORT ?? 4000;

const HOSTNAME = process.env.HOSTNAME ?? 'http://localhost';

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
