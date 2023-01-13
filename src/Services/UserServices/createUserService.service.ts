import dataSource from '../../data-source';
import { IUserService, IUserServiceRequest } from '../../Interfaces/UserServices';
import UserServices from '../../Entities/userServices.entity';
import Users from '../../Entities/users.entity';
import Categories from '../../Entities/categories.entity';
import AppError from '../../errors';

export const createUserServiceService = async (serviceData: IUserServiceRequest): Promise<IUserService> => {

    const userServicesRepository = dataSource.getRepository(UserServices);
    const userRepository = dataSource.getRepository(Users);

    const {userId, category:categoryName, ...data} = serviceData;

    const searchUser = await userRepository.findOneBy({id: userId});
    if (!searchUser){
        throw new AppError ("User was not found", 404);
    }

    const categoriesRepository = dataSource.getRepository(Categories);
    const searchCategory = await categoriesRepository.findOneBy({name: categoryName});
    if (!searchCategory){
        const category = categoriesRepository.create({name: categoryName});
        const createdCategory = await userServicesRepository.save(category);
    }

    const userService = userServicesRepository.create(serviceData);
    
    await userServicesRepository.save(userService)

    

    return userService;
} 