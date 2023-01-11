import express from "express";
import "express-async-errors";
import "reflect-metadata";

import { handleError } from "./errors";
import userRouter from './Routes/users.routes';

const app = express()
app.use(express.json())
app.use('/users', userRouter)
app.use(handleError)

export default app