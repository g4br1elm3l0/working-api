import dataSource from '../../data-source';
import Users from './../../Entities/users.entity';
import { IUsersRequest } from './../../Interfaces/Users/index';

export const createUserService = async (userData: IUsersRequest): Promise<Users> => {
    const userRepo = dataSource.getRepository(Users);
    const user = userRepo.create(userData);
    await userRepo.save(user);
    return user;
}; 