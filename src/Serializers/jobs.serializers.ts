import * as yup from "yup"
import { SchemaOf } from "yup";
import { IServiceRequest, IServiceResponse, IServiceUpdate } from "../Interfaces/Services";

export const serviceSerializer: SchemaOf<IServiceRequest> = yup.object().shape({
    title: yup.string().max(50).required(),
    description: yup.string().max(300).required(),
    femaleOnly: yup.boolean().notRequired()
});

export const serviceReponseSerializer: SchemaOf<IServiceResponse> = yup.object().shape({
    id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    femaleOnly: yup.boolean().required(),
    status: yup.string().required(),
    createdAt: yup.string().required(),
    updatedAt: yup.string().required()
});

export const serviceListResponseSerializer: SchemaOf<IServiceResponse[]> = yup.array(serviceReponseSerializer);

export const serviceUpdateSerializer: SchemaOf<IServiceUpdate> = yup.object().shape({
    title: yup.string().max(50).notRequired(),
    description: yup.string().max(300).notRequired(),
    femaleOnly: yup.boolean().notRequired()
});


