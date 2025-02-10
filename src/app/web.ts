import express from "express";
import { publicRouter } from "../route/public-API";
import { errorMiddleware } from "../middeware/error-middleware";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);
