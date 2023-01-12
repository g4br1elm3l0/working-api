import { Request, Response, NextFunction } from "express";
import dataSource from "../data-source";
import Users from "../Entities/users.entity";
import AppError from "../errors";

const ensureIsActive = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId

    const findUser = await dataSource.getRepository(Users).findOneBy({
        id
    })

    if (!findUser.isActive) {
        throw new AppError('User is not active', 403)
    }

    return next()
}

export default ensureIsActive;