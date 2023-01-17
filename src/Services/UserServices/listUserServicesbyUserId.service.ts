import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IUserService } from "../../Interfaces/UserServices";


export const listUserServicesbyUserIdService = async (userId: string): Promise<IUserService[]> => {
    console.log(userId);
    
    const userServicesRepository = dataSource.getRepository(UserServices);

     const SearchUserServiceByUserId = await userServicesRepository.find({
        where: {
            user: {
                id: userId
            }
        },
        relations: {
            category: true
        }     
    });
    console.log('listUserServicesbyUserIdService ', SearchUserServiceByUserId);
    

    return SearchUserServiceByUserId;
}