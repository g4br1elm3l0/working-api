
import UserServices from '../../Entities/userServices.entity'
import AppDataSource from '../../data-source'
import Users from '../../Entities/users.entity'
import { IJob, IJobUpdate } from '../../Interfaces/Jobs'
import { jobUpdateSerializer } from '../../Serializers/jobs.serializers'

const updateServiceService = async (userData: IJobUpdate, serviceId: string) => {

    const userRepository = AppDataSource.getRepository(UserServices)

    const findService = await userRepository.findOneBy({
        id: serviceId
    })

    const updatedService = userRepository.create({
        ...findService,
        ...userData
    })
    await userRepository.save(updatedService)

    // const validatedService = await jobUpdateSerializer.validate(updatedService, {
    //     stripUnknown: true
    // })

    return updatedService

}

export default updateServiceService