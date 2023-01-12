import dataSource from "../../data-source";
import { IUserResponse } from "../../Interfaces/Users";
import { responseUsersSerializer} from "../../Serializers/users.serializers";
import Users from './../../Entities/users.entity';

export const listAnUserService = async (userId: string): Promise<IUserResponse> => {

    const userRepo = dataSource.getRepository(Users);
    const user = await userRepo.findOneBy({
        id: userId
    });

    const correctUserFormat = responseUsersSerializer.validate(user, {
        stripUnknown: true
    });
    return correctUserFormat;
}