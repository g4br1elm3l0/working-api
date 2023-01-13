import express from "express";
import "express-async-errors";
import "reflect-metadata";

import { handleError } from "./errors";
import sessionRoutes from "./Routes/session.routes";
import userRouter from './Routes/users.routes';
import workerServicesRoutes from "./Routes/workerServices.routes";

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use("/login", sessionRoutes);
app.use("/worker-services", workerServicesRoutes)
app.use(handleError);

export default app;