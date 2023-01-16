import * as yup from "yup"
import { SchemaOf } from "yup";
import { IJobRequest, IJobUpdate } from "../Interfaces/Jobs";

export const jobsSerializer: SchemaOf<IJobRequest> = yup.object().shape({
    title: yup.string().max(50).required(),
    description: yup.string().max(300).required(),
    femaleOnly: yup.boolean().notRequired()
});

export const jobUpdateSerializer: SchemaOf<IJobUpdate> = yup.object().shape({
    title: yup.string().max(50).notRequired(),
    description: yup.string().max(300).notRequired(),
    femaleOnly: yup.boolean().notRequired()
});


