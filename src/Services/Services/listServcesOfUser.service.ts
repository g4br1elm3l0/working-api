import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IUserService } from "../../Interfaces/UserServices";


export const listUserServicesbyUserIdService = async (userId: string): Promise<IUserService[]> => {

    const userServicesRepository = dataSource.getRepository(UserServices);

     const SearchUserServiceByUserId = await userServicesRepository.find({
        where: {
            user: {
                id: userId
            }
        },
        relations: {
            category: true,
            location: true
        }     
    });

    return SearchUserServiceByUserId;
}