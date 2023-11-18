import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UniqueConstraintError } from 'sequelize';

import Trainer from '@models/Trainer';

interface LoginRequest extends Request {
    body: {
        nickname: string,
        password: string,
    }
}

const login = async (req: LoginRequest, res: Response) => {
    try {

        const trainer = await Trainer.findOne({
            // attributes: ['id', 'nickname'],
            where: {
                nickname: req.body.nickname
            },
        });

        if (!trainer) throw new Error('Usuário não existe!');

        const isMatched = bcrypt.compareSync(req.body.password, trainer.password);

        if (!isMatched) throw new Error('Senha incorreta!');

        const optionsJWT: jwt.SignOptions = {
            algorithm: 'HS256',
            expiresIn: '2 days', // seconds
        }

        const token = jwt.sign(
            {
                id: trainer.id,
                nickname: trainer.nickname,
            },
            process.env.JWT_SECRET_KEY ?? 'KEY',
            optionsJWT
        );

        return res.json({
            trainer: {
                id: trainer.id, nickname: trainer.nickname
            },
            token_data: {
                access_token: token,
                expirationIn: optionsJWT.expiresIn,
            },
        });
    } catch (err) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        res.status(500).json({ message: 'Ocorreu um erro...' });
    }

};

const signup = async (req: Request, res: Response) => {
    try {

        const trainer = await Trainer.create({
            nickname: req.body.nickname,
            password: req.body.password,
        });

        res.status(201).json({ trainer });
    } catch (err) {

        if (err instanceof UniqueConstraintError) {
            res.status(500).json({ message: 'O nickname já existe!' });
        }

        res.status(500).json({ message: 'Ocorreu um erro inesperado!' });

    }
};

export default {
    login,
    signup,
};
