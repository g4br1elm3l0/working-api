import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IServiceResponse } from "../../Interfaces/Services";
import { serviceListResponseSerializer } from "../../Serializers/jobs.serializers";

export const listServicesOfUserService = async (userId: string): Promise<IServiceResponse[]> => {
    const serviceRepository = dataSource.getRepository(UserServices);

    const service = await serviceRepository.findBy({ id: userId });

    const serviceResponse = serviceListResponseSerializer.validate(service, {
        abortEarly: false,
        stripUnknown: true
    });

    return serviceResponse;
};