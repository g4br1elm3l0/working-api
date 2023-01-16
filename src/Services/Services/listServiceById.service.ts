import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";

export const listServiceByIdService = async (serviceId: string) => {
    const serviceRepository = dataSource.getRepository(UserServices);

     const service = await serviceRepository.findBy({
        id: serviceId
    });

    return service;
}
