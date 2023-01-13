import dataSource from "../../data-source";
import { IUserResponse } from "../../Interfaces/Users";
import { responseUsersSerializer} from "../../Serializers/users.serializers";
import Users from './../../Entities/users.entity';

export const listUserByIdService = async (userId: string): Promise<IUserResponse> => {

    const userRepo = dataSource.getRepository(Users);
    const user = await userRepo.findOneBy({
        id: userId
    });

    const validatedUser = responseUsersSerializer.validate(user, {
        abortEarly: false,
        stripUnknown: true
    });
    return validatedUser;
}