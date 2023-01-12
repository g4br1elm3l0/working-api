import { NextFunction, Request, Response } from "express";
import AppError from "./../errors";

const ensureIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const IsAdm = req.user.isAdm;

    if (!IsAdm && req.user.id !== req.params.id) {
        throw new AppError("Missing admin permissions", 403);
    };

    return next();

};

export default ensureIsAdmMiddleware;