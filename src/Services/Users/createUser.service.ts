import dataSource from '../../data-source';
import AppError from '../../errors';
import Users from './../../Entities/users.entity';
import { IUserRequest, IUserResponse } from './../../Interfaces/Users/index';

export const createUserService = async (userData: IUserRequest): Promise<IUserResponse> => {

    const userRepo = dataSource.getRepository(Users);

    const searchUserByEmail = await userRepo.findOneBy({email: userData.email});
    if (searchUserByEmail){
        throw new AppError("Email already exists", 409);
    };

    const searchUserByTelephone = await userRepo.findOneBy({telephone: userData.telephone});
    if (searchUserByTelephone){
        throw new AppError("Telephone number already exists", 409);
    };

    if(parseInt(userData.telephone).toString().length < 11){
        throw new AppError("Telephone must contains only numbers", 400);
    }

    const user = userRepo.create(userData);
    await userRepo.save(user);

    const { password, ...userWithoutPassword } = user

    return userWithoutPassword;
}; 