
import UserServices from '../../Entities/userServices.entity'
import AppDataSource from '../../data-source'
import { oneUserServiceResponseSerializer } from '../../Serializers/userService.serializers'
import { IUserServiceUpdateRequest } from '../../Interfaces/UserServices'

const updateServiceService = async (userData: IUserServiceUpdateRequest, userId: string) => {
    console.log('updateServiceService: ', userData);
    
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
    // console.log('updateServiceService: ', findService);
    
    const updatedService = serviceRepository.create({
        ...findService,
        ...userData
    })
    // console.log('updateServiceService: ', updatedService);
    
    await serviceRepository.save(updatedService)

    const validatedService = await oneUserServiceResponseSerializer.validate(updatedService, {
        stripUnknown: true
    })

    return validatedService
}

export default updateServiceService