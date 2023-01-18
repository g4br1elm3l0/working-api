import dataSource from "../../data-source";
import { IUserResponse } from "../../Interfaces/Users";
import { IUserListReturn } from "../../Interfaces/WorkerServices";
import { responseUsersSerializer} from "../../Serializers/users.serializers";
import { listAnUserSerializer } from "../../Serializers/workerServices.serializers";
import Users from './../../Entities/users.entity';

export const listAnUserService = async (userId: string): Promise<IUserListReturn> => {

    const userRepo = dataSource.getRepository(Users);
    const user = await userRepo.findOne(
        {
        where: {id: userId},
        relations: { services: true },
        withDeleted: true
    }
    
    );

    const correctUserFormat = listAnUserSerializer.validate(user, {
        stripUnknown: true
    });
    return correctUserFormat;
}