import * as yup from "yup"
import { SchemaOf } from "yup";
import { IUserListReturn, IWorkerServiceCreateReturn, IWorkerServiceListReturn, IWorkerServiceResponse } from "../Interfaces/WorkerServices";

export const createWorkerServiceReturnSerializer: SchemaOf<IWorkerServiceCreateReturn> = yup.object().shape({
    user: yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        email: yup.string().required(),
        gender: yup.string().required(),
        birthday: yup.string().required(),
        profileImg: yup.string().required(),
        telephone: yup.string().required(),
        isActive: yup.boolean().required(),
        isWorker: yup.boolean().required(),
        isAdm: yup.boolean().required(),
        createdAt: yup.string().required(),
        updatedAt: yup.string().required(),
        deletedAt: yup.string().nullable()

    }),
    userService: yup.object().shape({
        id: yup.string().required(),
        title: yup.string().required(),
        description: yup.string().required(),
        femaleOnly: yup.boolean().required(),
        status: yup.string().required(),
        createdAt: yup.string().required(),
        updatedAt: yup.string().required(),
        deletedAt: yup.string().nullable()

    })
    
}); 

export const uniqueWorkerServiceReturnSerializer: SchemaOf<IWorkerServiceListReturn> = yup.object().nullable().shape({
    id: yup.string().required(),
    acceptedAt: yup.string().required().nullable(),
    user: yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        email: yup.string().required(),
        gender: yup.string().required(),
        birthday: yup.string().required(),
        profileImg: yup.string().required(),
        telephone: yup.string().required(),
        isActive: yup.boolean().required(),
        isWorker: yup.boolean().required(),
        isAdm: yup.boolean().required(),
        createdAt: yup.string().required(),
        updatedAt: yup.string().required()

    }),
    userService: yup.object().shape({
        id: yup.string().required(),
        title: yup.string().required(),
        description: yup.string().required(),
        femaleOnly: yup.boolean().required(),
        status: yup.string().required(),
        createdAt: yup.string().required(),
        updatedAt: yup.string().required()

    })
    
}); 

export const listServicesOfWorkerSerializer: SchemaOf<IWorkerServiceResponse> = yup.object().shape({
    id: yup.string().required(),
    acceptedAt: yup.string().required().nullable(),
    userService: yup.object().shape({
        id: yup.string().required(),
        title: yup.string().required(),
        description: yup.string().required(),
        femaleOnly: yup.boolean().required(),
        status: yup.string().required(),
        createdAt: yup.string().required(),
        updatedAt: yup.string().required()
    })
});

export const listAnUserSerializer: SchemaOf<IUserListReturn> = yup.object().shape({

        id: yup.string().required(),
        name: yup.string().required(),
        email: yup.string().required(),
        gender: yup.string().required(),
        birthday: yup.string().required(),
        profileImg: yup.string().required(),
        telephone: yup.string().required(),
        isActive: yup.boolean().required(),
        isWorker: yup.boolean().required(),
        isAdm: yup.boolean().required(),
        createdAt: yup.string().required(),
        updatedAt: yup.string().required(),
        deletedAt: yup.string().nullable(),

    services: yup.object().nullable().shape({
        id: yup.string().required(),
        title: yup.string().required(),
        description: yup.string().required(),
        femaleOnly: yup.boolean().required(),
        status: yup.string().required(),
        createdAt: yup.string().required(),
        updatedAt: yup.string().required(),
        deletedAt: yup.string().nullable()

    })
    
}); 

export const listWorkerServiceReturnSerializer = yup.array(uniqueWorkerServiceReturnSerializer)

export const listServicesOfWorkerResponseSerializer = yup.array(listServicesOfWorkerSerializer)



// export const listWorkerServiceReturnSerializer:


