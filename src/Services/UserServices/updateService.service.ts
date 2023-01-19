
import UserServices from '../../Entities/userServices.entity';
import { oneUserServiceResponseSerializer } from '../../Serializers/userService.serializers';
import { IUserServiceUpdateRequest } from '../../Interfaces/UserServices';
import Categories from '../../Entities/categories.entity';
import dataSource from '../../data-source';
import Location from '../../Entities/locations.entity';

const updateServiceService = async (userData: IUserServiceUpdateRequest, serviceId: string) => {
    const serviceRepository = dataSource.getRepository(UserServices);

    const findService = await serviceRepository.findOne({
        where: {
            id: serviceId
        },
        relations: {
            user: true,
            category: true,
            location: true
        }   
    });

    const { category, location, ...data } = userData;
    
    if(category){
        const categoriesRepository = dataSource.getRepository(Categories);
        let searchCategory = await categoriesRepository.findOneBy({ name: category.toLowerCase() });
        if (!searchCategory) {
            const newCategory = categoriesRepository.create({ name: category.toLowerCase() });
            searchCategory = await categoriesRepository.save(newCategory);
        };
        findService.category = searchCategory;
    }

    if(location.latitude && location.longitude){
        const locationRepository = dataSource.getRepository(Location);
        let searchLocation = await locationRepository.findOneBy({ latitude: location.latitude, longitude: location.longitude });
        if (!searchLocation) {
            const newLocation = locationRepository.create({ latitude: location.latitude, longitude: location.longitude });
            searchLocation = await locationRepository.save(newLocation);
        };
        findService.location = searchLocation;
    };
    
    const newService = {
        ...findService,
        ...data
    };
    await serviceRepository.save(newService);

    const validatedService = await oneUserServiceResponseSerializer.validate(newService, {
        stripUnknown: true
    });
    
    return validatedService;
};

export default updateServiceService;