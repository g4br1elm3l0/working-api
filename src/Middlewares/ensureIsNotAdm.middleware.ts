import { NextFunction, Request, Response } from "express";
import AppError from "./../errors";

const ensureIsNotAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (user.isAdm) {
        throw new AppError("Admins does not have access", 403);
    };
    
    return next();
};

export default ensureIsNotAdmMiddleware;
