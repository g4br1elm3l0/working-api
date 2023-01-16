import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IServiceResponse } from "../../Interfaces/Services";
import { serviceListResponseSerializer } from "../../Serializers/jobs.serializers";

export const listAllServicesService = async (): Promise<IServiceResponse[]> => {
    const serviceRepository = dataSource.getRepository(UserServices);

    const service = await serviceRepository.find();

    const responseService = serviceListResponseSerializer.validate(service, {
        abortEarly: false,
        stripUnknown: true
    });

    return responseService;
}