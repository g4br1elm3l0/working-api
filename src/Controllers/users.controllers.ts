import { Request, Response } from 'express';
import { createUserService } from '../Services/Users/createUser.service';
import listWorkersService from '../Services/Users/listWorker.service';
import { IUserRequest } from './../Interfaces/Users/index';
import { listUserService } from './../Services/Users/listUser.service';

export const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const newUser = await createUserService(userData)
    return res.status(201).json(newUser);
};

export const listUsersController = async (req: Request, res: Response) => {
    const users = await listUserService()
    return res.status(200).json(users)
}

export const listWorkersController = async (req: Request, res: Response) => {
    const users = await listWorkersService()
    return res.status(200).json(users)
}

