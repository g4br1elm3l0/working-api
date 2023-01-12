import { NextFunction, Request, Response } from "express";
import { EntityTarget, ObjectLiteral } from "typeorm";
import dataSource from "../data-source";
import AppError from "../errors";



export const ensureIsValidIdMiddleware = (entity: EntityTarget<ObjectLiteral>) => async (req: Request, res: Response, next: NextFunction) => {
    
    const repo = dataSource.getRepository(entity);
    const searchDataOnRepo = await repo.findOneBy({id: req.params.id});
    
    if (!searchDataOnRepo){
        throw new AppError("id was not found", 404);
    };
    return next();
};