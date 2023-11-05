import Paths from "@src/constants/Paths";
import { Router } from "express";
// import { create, get } from "./UserRoutes";
import validate from "@src/util/validator";
import { checkSchema } from "express-validator";
import { createSession } from "./AuthSession";
import { UserLoginSchema } from "../models/UserAuth";

const sessionRouter = Router();

sessionRouter.post(
  Paths.Auth.Login,
  checkSchema(UserLoginSchema),
  validate,
  createSession
);
