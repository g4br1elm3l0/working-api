import { NextFunction, Request, Response } from "express"
import AppError from "../errors";
import jwt from "jsonwebtoken";
import "dotenv/config";

<<<<<<< HEAD
const ensureAuthMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    let token = req.headers.authorization;

    if( !token ) {
        throw new AppError("Missing authorization headers", 401);
    };
    
    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, ( error: any, decoded: any ) => {
        if( error ) {
=======
const ensureAuthMiddleware = (req: Request, res: Response, next:NextFunction) => {    
    const authorization = req.headers.authorization;
    if (!authorization){
        throw new AppError("Missing authorization headers", 401);
    };
    
    const token = authorization.split(" ")[1];
    
    return Jwt.verify(token, process.env.SECRET_KEY, (error:Error, decoded:JwtPayload) => {
        if (error){
>>>>>>> 4b8cfde96a7dc5dbffa84ec783ca8381a2aec894
            throw new AppError("Missing authorization headers", 401);
        };

        req.user = {
            id: decoded.sub,
            isWorker: decoded.isWorker,
            isActive: decoded.isActive,
            isAdm:    decoded.isAdm
        }
<<<<<<< HEAD

=======
        
>>>>>>> 4b8cfde96a7dc5dbffa84ec783ca8381a2aec894
        return next();
    });
};

export default ensureAuthMiddleware;