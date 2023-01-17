import dataSource from "../../data-source";

import Users from "../../Entities/users.entity";
import UserServices from "../../Entities/userServices.entity";
import AppError from "../../errors";

const deleteWorkerService = async (userId: string) => {
    const userRepository = dataSource.getRepository(Users);
    const serviceRepository = dataSource.getRepository(UserServices)
    
    const findUser = await userRepository.findOneBy({ id: userId });

    if(!findUser.isWorker) {
        throw new AppError("invalid id is not worker", 404)
    }

    const services = await serviceRepository.find({
        where: {
            user: {
                id: userId
            }
        }
    });

    services.map(async service => {
        service.status = "pendente"

        await serviceRepository.save(service)
    })
    
    findUser.isActive = false;
    
    await userRepository.save(findUser);
    
    await userRepository.softRemove(findUser);
    
    return {};
}

export default deleteWorkerService;