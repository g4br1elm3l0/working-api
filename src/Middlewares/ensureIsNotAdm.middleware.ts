import { NextFunction, Request, Response } from 'express';
import AppError from '../errors';

const ensureIsNotAdm = async (req: Request, res: Response, next: NextFunction) => {
    const IsAdm = req.user.isAdm

    if (IsAdm) {
        throw new AppError('Needs to be a not a adm account!', 403)
    }

    return next()
}

export default ensureIsNotAdm