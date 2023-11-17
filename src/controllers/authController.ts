import Trainer from '@models/Trainer';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';

interface LoginRequest extends Request {
    body: {
        nickname: string,
        password: string,
    }
}

const login = async (req: LoginRequest, res: Response) => {
    try {

        const trainer = await Trainer.findOne({
            where: {
                nickname: req.body.nickname
            }
        });

        res.json({ trainer });
    } catch (err) {
        res.status(500).json({ message: 'Ocorreu um erro...', err });
    }

};

const signup = async (req: Request, res: Response) => {
    try {

        const trainer = await Trainer.create({
            nickname: req.body.nickname,
            password: req.body.password,
        });

        res.json({ trainer });
    } catch (err) {

        if (err instanceof ValidationError) {
            if (err.name == 'SequelizeUniqueConstraintError') {
                res.status(500).json({ message: 'O nickname já existe!' });
            }
        }

        res.status(500).json({ message: 'Ocorreu um erro inesperado!' });

    }
};

export default {
    login,
    signup,
};
