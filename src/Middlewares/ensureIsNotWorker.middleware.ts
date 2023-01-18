import { NextFunction, Request, Response } from 'express';
import AppError from '../errors';

const ensureIsNotWorker = async (req: Request, res: Response, next: NextFunction) => {
    const isWorker = req.user.isWorker

    if (isWorker) {
        throw new AppError('Needs to be a not worker account!', 403)
    }

    return next()
}

export default ensureIsNotWorker