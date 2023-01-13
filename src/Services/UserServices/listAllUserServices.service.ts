import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IUserService } from "../../Interfaces/UserServices";

export const listAllUserServicesService = async (): Promise<IUserService[] | undefined> => {
    const UserServiceRepository = dataSource.getRepository(UserServices);

     const userServices = await UserServiceRepository.find({relations: {
        category: true,
        user: true
     }});

    return userServices;
}