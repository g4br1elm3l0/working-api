import * as yup from "yup"
import { SchemaOf } from "yup";
import { IJobRequest } from "../Interfaces/Jobs";

export const jobsSerializer: SchemaOf<IJobRequest> = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    femaleOnly: yup.boolean().notRequired()
});


