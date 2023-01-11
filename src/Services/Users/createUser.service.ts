import dataSource from '../../data-source';
import Users from './../../Entities/users.entity';
import { IUserRequest, IUserResponse } from './../../Interfaces/Users/index';

export const createUserService = async (userData: IUserRequest): Promise<IUserResponse> => {
    const userRepo = dataSource.getRepository(Users);

    const user = userRepo.create(userData);

    await userRepo.save(user);

    const { password, ...userWithoutPassword } = user

    return userWithoutPassword;
}; 