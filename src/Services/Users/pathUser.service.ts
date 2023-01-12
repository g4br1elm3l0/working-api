import { hashSync } from 'bcryptjs';
import dataSource from "../../data-source";
import { IReqUser } from '../../Interfaces/Session';
import { IUserResponse, IUserUpdate } from "../../Interfaces/Users";
import { responseUsersSerializer } from "../../Serializers/users.serializers";
import Users from './../../Entities/users.entity';
import AppError from './../../errors';

export const pathUserService = async (userData: IUserUpdate, userParamsId: string, user: IReqUser): Promise<IUserResponse> => {
    const userRepo = dataSource.getRepository(Users);
    

    if (!user.isAdm && user.id !== userParamsId){
        throw new AppError("Missing Admin permissions", 403);
    }

    if (userData.email) {
        const searchUserByEmail = await userRepo.findOneBy({ email: userData.email });
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
        id: userParamsId
    })

    if (userData.password) {
        userData.password = hashSync(userData.password, 10);
    };

    const updatedUser = {
        ...findUser,
        ...userData
    }


    await userRepo.update({ id: userParamsId }, updatedUser)
    const updatedUserWithoutPassword = await responseUsersSerializer.validate(updatedUser, {
        stripUnknown: true
    })

    return updatedUserWithoutPassword
}