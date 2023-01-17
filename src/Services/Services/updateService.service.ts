import UserServices from '../../Entities/userServices.entity'
import AppDataSource from '../../data-source'
import { IServiceUpdate } from '../../Interfaces/Services'

const updateServiceService = async (userData: IServiceUpdate, serviceId: string) => {
    const userRepository = AppDataSource.getRepository(UserServices)

    const findService = await userRepository.findOneBy({
        id: serviceId
    })

    const updatedService = userRepository.create({
        ...findService,
        ...userData
    })

    await userRepository.save(updatedService)

    return updatedService;
};

export default updateServiceService