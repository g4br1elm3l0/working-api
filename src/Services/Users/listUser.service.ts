import dataSource from "../../data-source";
import { IUserResponse } from "../../Interfaces/Users";
import { usersWithoutPasswordSerializer } from "../../Serializers/users.serializers";
import Users from './../../Entities/users.entity';

export const listUserService = async (): Promise<IUserResponse[]> => {

    const userRepo = dataSource.getRepository(Users);
    const users = await userRepo.findBy({
        isWorker: false
    });

    const correctUsersFormat = usersWithoutPasswordSerializer.validate(users, {
        stripUnknown: true
    });
    return correctUsersFormat;
}