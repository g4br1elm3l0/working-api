import { NextFunction, Request, Response } from 'express';
import AppError from './../errors';

const ensureIsWorker = async (req: Request, res: Response, next: NextFunction) => {
    const isWorker = req.user.isWorker

    if (!isWorker) {
        throw new AppError('Missing workers permissions!', 403)
    }

    return next()
}

export default ensureIsWorker