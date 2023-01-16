import * as yup from "yup"
import { SchemaOf } from "yup";
import { IUserServiceRequest } from "../Interfaces/UserServices";

export const userServiceSerializer: SchemaOf<IUserServiceRequest> = yup.object().shape({
    title: yup.string().max(50).required(),
    description: yup.string().max(300).required(),
    femaleOnly: yup.boolean().notRequired(),
    category: yup.string().required()
});


