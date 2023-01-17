import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import AppError from "../../errors";

const deleteJobsService = async (serviceId: string) => {
    const serviceRepository = dataSource.getRepository(UserServices)

    const findService = await serviceRepository.findOneBy({
        id: serviceId
    })

    findService.status = "excluido"
    await serviceRepository.save(findService)

    if(!findService){
        throw new AppError('service does not exists', 404)
    }

    const deletedService = await serviceRepository.softRemove(findService)

    return {}
}

export default deleteJobsService;
