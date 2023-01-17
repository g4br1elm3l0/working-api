import AppDataSource from "../../data-source";
import Users from "../../Entities/users.entity";
import UserServices from "../../Entities/userServices.entity";

const listServicesByUserService = async(userId: string): Promise<UserServices[]>=> {
    const userRepository = AppDataSource.getRepository(Users);

    const user = await userRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            services: true
        },
        withDeleted: true
    });
    
    return user.services;
};

export default listServicesByUserService;