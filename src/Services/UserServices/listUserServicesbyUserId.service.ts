import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IUserService } from "../../Interfaces/UserServices";


export const listUserServicesbyUserIdService = async (userId: string): Promise<IUserService> => {

    const userServicesRepository = dataSource.getRepository(UserServices);

     const SearchUserServiceByUserId = await userServicesRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            user: true,
            category: true
        }
        
    })

    return SearchUserServiceByUserId;
}

// {
//     id: "5e133a8d-e823-41bf-bf9e-ad5969f03ca3",
//     title: "Consertem meu PC",
//     description: "Meu PC quebrou",
//     status: "pendente",
//     "createdAt": "2023-01-13T17:46:35.588Z",
//     "user": {
//         "id": "fbc2ce2f-faed-4261-a478-f1d56be8fd6e",
//         "name": "teste2",
//         "email": "teste2@kenzie.com",
//         "profileImg": "oi",
//         "telephone": "89976999943",
//     },
//     "category": {
//         "id": "a173a604-6ebf-4ab3-a80f-9a38a88c2837",
//         "name": "assistência técnica"
//     }
// }