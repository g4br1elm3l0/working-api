import { NextFunction, Request, Response } from "express";
import { EntityTarget, ObjectLiteral } from "typeorm";
import dataSource from "../data-source";
import AppError from "../errors";

export const ensureIsValidIdMiddleware = (entity1: EntityTarget<ObjectLiteral>, entity2: EntityTarget<ObjectLiteral> = entity1) => async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;

    if( !params.userId && !params.servicesId ) {
        throw new AppError( 'Invalid id', 404 );
    };
    
    if(params.userId){
        const repo = dataSource.getRepository(entity1);
        
        const searchDataOnRepo = await repo.findOneBy({ id: params.userId });
        if (!searchDataOnRepo){
            throw new AppError("id was not found", 404);
        };
    }

    if(params.servicesId){
        const repo = dataSource.getRepository(entity2);
        
        const searchDataOnRepo = await repo.findOneBy({ id: params.servicesId });    
        if (!searchDataOnRepo){
            throw new AppError("id was not found", 404);
        };
    }

    return next();
};