import dataSource from "../../data-source";

import Users from "../../Entities/users.entity";



const deleteUserService = async (userId: string) => {
    const userRepository = dataSource.getRepository(Users);

    const findUser = await userRepository.findOneBy({ id: userId });
    
    findUser.isActive = false;
    await userRepository.save(findUser);

    const deletedUser = await userRepository.softRemove(findUser);

    return {};
};
export default deleteUserService;
