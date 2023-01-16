import * as yup from "yup"
import { SchemaOf } from "yup";
import { IWorkerServiceRequest } from "../Interfaces/WorkerServices";

export const workerServiceSerializer: SchemaOf<IWorkerServiceRequest> = yup.object().shape({
    userId: yup.string().required(),
    userServiceId: yup.string().required(),
    acceptedAt: yup.string()
});


