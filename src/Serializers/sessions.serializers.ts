import * as yup from "yup"
import { SchemaOf } from "yup";
import { ILogin } from "../Interfaces/Session";

export const session: SchemaOf<ILogin> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});