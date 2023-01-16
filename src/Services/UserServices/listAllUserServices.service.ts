import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IUserServiceResponse } from "../../Interfaces/UserServices";
import { userServicesResponseSerializer } from "../../Serializers/userService.serializers";

export const listAllUserServicesService = async (): Promise<IUserServiceResponse[]> => {
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

    const correctUserServicesFormat = userServicesResponseSerializer.validate(userServices, {
        stripUnknown: true
    })

    return correctUserServicesFormat;
};