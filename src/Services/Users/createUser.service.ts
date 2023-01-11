import dataSource from '../../data-source';
import Users from './../../Entities/users.entity';
import { IUserRequest } from './../../Interfaces/Users/index';

export const createUserService = async (userData: IUserRequest): Promise<Users> => {
    const userRepo = dataSource.getRepository(Users);

    const user = userRepo.create(userData);

    await userRepo.save(user);

    return user;
}; 