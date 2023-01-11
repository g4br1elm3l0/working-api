import { Request, Response } from 'express';
import { createUserService } from '../Services/Users/createUser.service';
import listWorkersService from '../Services/Users/listWorker.service';
import { IUserRequest, IUserUpdate } from './../Interfaces/Users/index';
import { listUserService } from './../Services/Users/listUser.service';
import { pathUserService } from './../Services/Users/pathUser.service';

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


export const pathUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const userData: IUserUpdate = req.body
    const updatedUser = await pathUserService(userData, userId)
    return res.json(updatedUser)
}
