
import UserServices from '../../Entities/userServices.entity'
import AppDataSource from '../../data-source'
import Users from '../../Entities/users.entity'
import { IJob, IJobUpdate } from '../../Interfaces/Jobs'
import { jobUpdateSerializer } from '../../Serializers/jobs.serializers'
import { oneUserServiceResponseSerializer } from '../../Serializers/userService.serializers'
import {IUserServiceRequest} from '../../Interfaces/UserServices'

const updateServiceService = async (userData: IUserServiceRequest, userId: string) => {

    const serviceRepository = AppDataSource.getRepository(UserServices)

    const findService = await serviceRepository.find({
        where: {
            user: {
                id: userId
            }
        },
        relations: {
            user: true,
            category: true,
            location: true
        }     
    });

    const updatedService = serviceRepository.create({
        ...findService,
        ...userData
    })
    await serviceRepository.save(updatedService)

    const validatedService = await oneUserServiceResponseSerializer.validate(updatedService, {
        stripUnknown: true
    })

    return validatedService

}

export default updateServiceService