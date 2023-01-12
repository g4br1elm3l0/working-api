import { NextFunction, Request, Response } from 'express';
import AppError from './../errors';

const ensureIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const IsAdm = req.user.isAdm

    if (!IsAdm) {
        throw new AppError('only Adm service!', 403)
    }

    return next()

}

export default ensureIsAdmMiddleware