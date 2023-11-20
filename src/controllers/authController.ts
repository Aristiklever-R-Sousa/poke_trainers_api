import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmptyResultError, UniqueConstraintError, ValidationError } from 'sequelize';

import Trainer from '@models/Trainer';

interface LoginRequest extends Request {
    body: {
        name: string,
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
            rejectOnEmpty: true,
        });

        const isMatched = await bcrypt.compare(req.body.password, trainer.password);

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
        if (err instanceof EmptyResultError)
            return res.status(404).json({
                name: err.name,
                message: 'Usuário não encontrado!',
            });

        if (err instanceof Error)
            return res.status(401).json({
                name: err.name,
                message: err.message,
            });

        return res.status(500).send(err);
    }

};

const signup = async (req: Request, res: Response) => {
    try {

        const trainer = await Trainer.create({
            name: req.body.name,
            nickname: req.body.nickname,
            password: req.body.password,
        });

        return res.status(201).json({
            trainer: {
                id: trainer.id,
                name: trainer.name,
                nickname: trainer.nickname,
            }
        });
    } catch (err) {

        if (err instanceof UniqueConstraintError) {
            return res.status(400).json({ message: 'O nickname já existe!' });
        }

        if (err instanceof ValidationError) return res.status(400).json({ errors: err.errors });

        return res.status(500).json({ err });

    }
};

export default {
    login,
    signup,
};
