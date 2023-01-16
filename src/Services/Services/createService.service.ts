import dataSource from '../../data-source';
import UserServices from '../../Entities/userServices.entity';
import { IServiceRequest, IServiceResponse } from '../../Interfaces/Services';
import { serviceReponseSerializer } from '../../Serializers/jobs.serializers';

export const createServiceService = async (userData: IServiceRequest): Promise<IServiceResponse> => {
    const serviceRepository = dataSource.getRepository(UserServices);
    
    const service = serviceRepository.create(userData);
    await serviceRepository.save(service);

    const serviceResponse = serviceReponseSerializer.validate(service, {
        abortEarly: false,
        stripUnknown: true
    });

    return serviceResponse;
};