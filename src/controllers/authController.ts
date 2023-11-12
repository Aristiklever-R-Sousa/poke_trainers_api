import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
    res.json(['vamo de login então?']);
};

const signup = async (req: Request, res: Response) => {
    res.json(['Telinha de cadastro!']);
};

export default {
    login,
    signup,
};
