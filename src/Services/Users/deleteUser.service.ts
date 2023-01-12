import dataSource from "../../data-source";

import Users from "../../Entities/users.entity";



const deleteUserService = async (userId: string) => {
    const userRepository = dataSource.getRepository(Users);

    const findUser = await userRepository.findOneBy({id: userId});

    const deletedUser = await userRepository.softRemove(findUser)

    await userRepository.update({
        id: userId
    },{
        isActive: false
    });


    return deletedUser
};
export default deleteUserService;
