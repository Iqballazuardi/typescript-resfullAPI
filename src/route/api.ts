import express from "express";
import { authmiddleware } from "../middeware/auth-middleware";
import { UserController } from "../controller/user-controller";

export const apiRouter = express.Router();
apiRouter.use(authmiddleware);

// user API
apiRouter.get("/api/users/current", UserController.get);
