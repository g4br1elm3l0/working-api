import { hashSync } from 'bcryptjs';
import dataSource from "../../data-source";
import { IUserResponse, IUserUpdate } from "../../Interfaces/Users";
import { responseUsersSerializer } from "../../Serializers/users.serializers";
import Users from './../../Entities/users.entity';
import AppError from './../../errors';

export const pathUserService = async (userData: IUserUpdate, userId: string): Promise<IUserResponse> => {
    const userRepo = dataSource.getRepository(Users);
    const searchUserByEmail = await userRepo.findOneBy({ email: userData.email });

    if (userData.email) {
        if (searchUserByEmail) {
            throw new AppError("Email already exists", 409);
        };
    }

    if (userData.telephone) {
        const searchUserByTelephone = await userRepo.findOneBy({ telephone: userData.telephone });
        if (searchUserByTelephone) {
            throw new AppError("Telephone number already exists", 409);
        };
        if (parseInt(userData.telephone).toString().length < 11) {
            throw new AppError("Telephone must contains only numbers", 400);
        }
    }


    const findUser = await userRepo.findOneBy({
        id: userId
    })

    if (userData.password) {
        userData.password = hashSync(userData.password, 10);
    };

    const updatedUser = {
        ...findUser,
        ...userData
    }


    await userRepo.update({ id: userId }, updatedUser)
    const updatedUserWithoutPassword = await responseUsersSerializer.validate(updatedUser, {
        stripUnknown: true
    })

    return updatedUserWithoutPassword
}