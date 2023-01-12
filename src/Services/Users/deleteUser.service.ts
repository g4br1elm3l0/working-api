import dataSource from "../../data-source";

import Users from "../../Entities/users.entity";



const deleteUserService = async (userId: string) => {
    const userRepository = dataSource.getRepository(Users);

    const findUser = await userRepository.findOneBy({id: userId});
    console.log(findUser);
    
    findUser.isActive = false;
    await userRepository.save(findUser);

    // await userRepository.update({
    //     id: userId
    // },{
    //     isActive: false
    // });

    const deletedUser = await userRepository.softRemove(findUser);
    console.log(deletedUser);

    return {};
};
export default deleteUserService;
