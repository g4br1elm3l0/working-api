import { NextFunction, Request, Response } from "express";
import AppError from "./../errors";

const ensureIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { user, params } = req;
    
    if (!user.isAdm && user.id !== params.userId) {
        throw new AppError("Missing admin permissions", 403);
    };
    
    return next();
};

export default ensureIsAdmMiddleware;