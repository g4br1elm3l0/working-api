import { NextFunction, Request, Response } from "express"
import AppError from "../errors";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    let token = req.headers.authorization;

    if( !token ) {
        throw new AppError("Missing authorization headers", 401);
    };
    
    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, ( error: any, decoded: any ) => {
        if( error ) {
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