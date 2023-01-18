import { NextFunction, Request, Response } from "express"
import AppError from "../errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware = (req: Request, res: Response, next:NextFunction) => {    
    const authorization = req.headers.authorization;
    if (!authorization){
        throw new AppError("Missing authorization headers", 401);
    };
    
    const token = authorization.split(" ")[1];
    
    return jwt.verify(token, process.env.SECRET_KEY, (error:Error, decoded:JwtPayload) => {
        if (error){
            throw new AppError("Missing authorization headers", 401);
        };

        req.user = {
            id: decoded.sub,
            isWorker: decoded.isWorker,
            isActive: decoded.isActive,
            isAdm:    decoded.isAdm
        }
        
        return next();
    });
};

export default ensureAuthMiddleware;