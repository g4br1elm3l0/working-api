import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IUserService, IUserServiceRequest } from "../../Interfaces/UserServices";
import { IUserResponse } from "../../Interfaces/Users";
import { userServiceSerializer } from "../../Serializers/userService.serializers";
import Users from '../../Entities/users.entity';


export const listJobsService = async (userId: string): Promise<IUserServiceRequest[]> => {

    const jobRepository = dataSource.getRepository(UserServices);
    // const userRepository = dataSource.getRepository(Users)
    // const findUser: IUserResponse = await userRepository.findOneBy({
    //     id: userId,
    //   })

     const jobs = await jobRepository.findBy({
        id: userId
    })

   


    return jobs;
}