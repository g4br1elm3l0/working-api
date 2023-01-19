import dataSource from '../../data-source';
import Categories from '../../Entities/categories.entity';
import Location from '../../Entities/locations.entity';
import Users from '../../Entities/users.entity';
import UserServices from '../../Entities/userServices.entity';
import AppError from '../../errors';
import { IUserService, IUserServiceRequest } from '../../Interfaces/UserServices';

export const createUserServiceService = async (serviceData: IUserServiceRequest, userId: string): Promise<IUserService> => {
    
    const userServicesRepository = dataSource.getRepository(UserServices);
    const userRepository = dataSource.getRepository(Users);
    
    const { category, location, ...data } = serviceData;


    const searchUser = await userRepository.findOneBy({ id: userId });
    if (!searchUser) {
        throw new AppError("User was not found", 404);
    }
    if(serviceData.femaleOnly){
        if(searchUser.gender.toLowerCase() === "masculino"){
            throw new AppError("femaleOnly Options can not be used", 403);
        }
    }

    const categoriesRepository = dataSource.getRepository(Categories);
    let searchCategory = await categoriesRepository.findOneBy({ name: category.toLowerCase() });
    if (!searchCategory) {
        const newCategory = categoriesRepository.create({ name: category.toLowerCase() });
        searchCategory = await categoriesRepository.save(newCategory);
    }

    const locationRepository = dataSource.getRepository(Location);
    let searchLocation = await locationRepository.findOneBy({ latitude: location.latitude, longitude: location.longitude })
    if (!searchLocation) {
        const newLocation = locationRepository.create({ latitude: location.latitude, longitude: location.longitude })
        searchLocation = await locationRepository.save(newLocation)
    }

    const userService = userServicesRepository.create({
        ...data,
    });
    userService.category = searchCategory;
    userService.user = searchUser;
    userService.location = searchLocation;

    const CreatedUserService = await userServicesRepository.save(userService);
    
    const { password, ...userWithoutPassword } = CreatedUserService.user

    return {
        ...CreatedUserService,
        user: userWithoutPassword
    };
} 