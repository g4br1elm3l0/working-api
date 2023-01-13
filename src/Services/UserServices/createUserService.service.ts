import dataSource from '../../data-source';
import { IUserService, IUserServiceRequest } from '../../Interfaces/UserServices';
import UserServices from '../../Entities/userServices.entity';
import Users from '../../Entities/users.entity';
import Categories from '../../Entities/categories.entity';
import AppError from '../../errors';

export const createUserServiceService = async (serviceData: IUserServiceRequest, userId: string): Promise<IUserService> => {

    const userServicesRepository = dataSource.getRepository(UserServices);
    const userRepository = dataSource.getRepository(Users);

    const {category, ...data} = serviceData;

    const searchUser = await userRepository.findOneBy({id: userId});
    if (!searchUser){
        throw new AppError ("User was not found", 404);
    }

    const categoriesRepository = dataSource.getRepository(Categories);
    let searchCategory = await categoriesRepository.findOneBy({name: category.toLowerCase()});
    if (!searchCategory){
        const newCategory = categoriesRepository.create({name: category.toLowerCase()});
        searchCategory = await categoriesRepository.save(newCategory);
    }

    const userService = userServicesRepository.create({
        ...data,
    });
    userService.category = searchCategory;
    userService.user = searchUser;
    
    const CreatedUserService = await userServicesRepository.save(userService);

    const {password, ...userWithoutPassword} = CreatedUserService.user

    return {
        ...CreatedUserService,
        user: userWithoutPassword
    };
} 