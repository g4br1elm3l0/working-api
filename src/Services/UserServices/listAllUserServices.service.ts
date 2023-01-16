import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IUserService } from "../../Interfaces/UserServices";

export const listAllUserServicesService = async (): Promise<IUserService[]> => {
    const UserServiceRepository = dataSource.getRepository(UserServices);
    
    const userServices = await UserServiceRepository.find({
        where: {
            status: "pendente"
        },
        relations: {
            user: true,
            category: true
        }
    });

    return userServices;
}