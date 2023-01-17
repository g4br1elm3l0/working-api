import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IServiceResponse } from "../../Interfaces/Services";
import { userServicesResponseSerializer } from "../../Serializers/userService.serializers";
import { IUserServiceResponse } from "../../Interfaces/UserServices";

export const listAllServicesService = async () => {
    const serviceRepository = dataSource.getRepository(UserServices);

    const service = await serviceRepository.find();

    const responseService = userServicesResponseSerializer.validate(service, {
        abortEarly: false,
        stripUnknown: true
    });

    return responseService;
}