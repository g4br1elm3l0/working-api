import * as yup from "yup"
import { SchemaOf } from "yup";
import { IWorkerServiceListReturn, IWorkerServiceRequest } from "../Interfaces/WorkerServices";

export const workerServiceSerializer: SchemaOf<IWorkerServiceRequest> = yup.object().shape({
    userId: yup.string().required(),
    userServiceId: yup.string().required(),
    acceptedAt: yup.string()
    
});

export const uniqueWorkerServiceReturnSerializer: SchemaOf<IWorkerServiceListReturn> = yup.object().shape({
    id: yup.string().required(),
    acceptedAt: yup.string().required().nullable(),
    user: yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().notRequired(),
        gender: yup.string().required(),
        birthday: yup.string().required(),
        profileImg: yup.string().required(),
        telephone: yup.string().required(),
        isActive: yup.boolean().required(),
        isWorker: yup.boolean().required(),
        isAdm: yup.boolean().required(),
        createdAt: yup.string().required(),
        updatedAt: yup.string().required(),
        deletedAt: yup.string().required().nullable(),
    }),
    userService: yup.object().shape({
        id: yup.string().required(),
        title: yup.string().required(),
        description: yup.string().required(),
        femaleOnly: yup.boolean().required(),
        status: yup.string().required(),
        createdAt: yup.string().required(),
        updatedAt: yup.string().required(),
        deletedAt: yup.string().required().nullable()
    })
    
}); 

export const listWorkerServiceReturnSerializer = yup.array(uniqueWorkerServiceReturnSerializer)



// export const listWorkerServiceReturnSerializer:


