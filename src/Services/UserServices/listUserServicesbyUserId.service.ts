import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IUserService } from "../../Interfaces/UserServices";


export const listUserServicesbyUserIdService = async (userId: string): Promise<IUserService[]> => {

    const userServicesRepository = dataSource.getRepository(UserServices);

     const SearchUserServiceByUserId = await userServicesRepository.findBy({
        id: userId
    })

    return SearchUserServiceByUserId;
}