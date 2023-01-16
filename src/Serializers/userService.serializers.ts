import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserServiceRequest, IUserServiceResponse } from "../Interfaces/UserServices";

export const userServiceSerializer: SchemaOf<IUserServiceRequest> = yup.object().shape({
    title: yup.string().max(50).required(),
    description: yup.string().max(300).required(),
    femaleOnly: yup.boolean().notRequired(),
    category: yup.string().required(),
    location: yup.object({
        latitude: yup.number().required(),
        longitude: yup.number().required()
    })
});

export const oneUserServiceResponseSerializer: SchemaOf<IUserServiceResponse> = yup.object().shape({
    id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    status: yup.string().required(),
    createdAt: yup.date().required(),
    user: yup.object(
        {
            id: yup.string().required(),
            name: yup.string().required(),
            email: yup.string().required(),
            profileImg: yup.string().required(),
            telephone: yup.string().required()
        }),
    category: yup.object(
        {
            id: yup.string().required(),
            name: yup.string().required()
        }),
    location: yup.object({
        latitude: yup.number().required(),
        longitude: yup.number().required()
    })
});

export const userServicesResponseSerializer: SchemaOf<IUserServiceResponse[]> = yup.array(oneUserServiceResponseSerializer);
