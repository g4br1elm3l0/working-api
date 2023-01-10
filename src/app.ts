import "reflect-metadata"
import "express-async-errors"
import express from "express"

import { handleError } from "./errors"
import workersRoutes from "./Routes/workers.routes"

const app = express()
app.use(express.json())

app.use('/workers', workersRoutes)

app.use(handleError)

export default app