import jwt, { Secret, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY ?? '';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error('Token não informado!');
        }
        // console.log({ token, SECRET_KEY });

        const decoded = jwt.verify(token, SECRET_KEY);
        // console.log({ decoded });
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) return res.status(401).json({ message: 'O token expirou, faça login novamente!' });
        if (err instanceof Error) return res.status(401).json({ message: 'Token não informado!' });

        return res.status(500).json({ err });
    }
};

export default authMiddleware;
