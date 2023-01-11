import { Request, Response } from 'express';
import { createUserService } from '../Services/Users/createUser.service';
import { IUsersRequest } from './../Interfaces/Users/index';
export const createUserController = async (req: Request, res: Response) => {
    const userData: IUsersRequest = req.body
    const newUser = await createUserService(userData)
    const { password, ...myUser } = newUser
    return res.status(201).json(myUser);
};
