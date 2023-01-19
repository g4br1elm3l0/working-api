import { Request, Response, NextFunction } from "express";
import dataSource from "../data-source";
import Users from "../Entities/users.entity";
import AppError from "../errors";

const ensureIsActive = async (req: Request, res: Response, next: NextFunction) => {
    const { userId: id } = req.params;

    const userRepository = dataSource.getRepository(Users)
    const findUser = await userRepository.findOneBy({ id: id })

    if (!findUser){
        throw new AppError("id was not found", 404);
    };

    if (!findUser.isActive) {
        throw new AppError('User is not active', 403)
    };

    return next()
};

export default ensureIsActive;