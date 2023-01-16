import { Router } from "express";
import { createSessionController } from "../Controllers/session.controllers";

const sessionRoutes = Router();

sessionRoutes.post("", createSessionController);

export default sessionRoutes;