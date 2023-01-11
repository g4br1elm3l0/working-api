import { Request, Response } from 'express';
import { createUserService } from '../Services/Users/createUser.service';
import { IUserRequest } from './../Interfaces/Users/index';

export const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const newUser = await createUserService(userData)
    return res.status(201).json(newUser);
};
