import { Request, Response } from 'express';
import { createUserService } from '../Services/Users/createUser.service';
import listWorkersService from '../Services/Users/listWorker.service';
import { IUserRequest, IUserUpdate } from './../Interfaces/Users/index';
import { listUserService } from './../Services/Users/listUser.service';
import { updateUserService } from '../Services/Users/uptadeUser.service';

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


export const updateUserController = async (req: Request, res: Response) => {
    const userParamsId: string = req.params.id
    const userData: IUserUpdate = req.body
    const updatedUser = await updateUserService(userData, userParamsId, req.user)
    return res.json(updatedUser)
}
