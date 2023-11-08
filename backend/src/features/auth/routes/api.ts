import Paths from "@src/constants/Paths";
import { Router } from "express";
// import { create, get } from "./UserRoutes";
import validate from "@src/util/validator";
import { checkSchema } from "express-validator";
import { createSession } from "./AuthSession";
import { UserAuthSchema } from "../models/UserAuth";

const AuthRouter = Router();

AuthRouter.post(
  Paths.Auth.Authenticate,
  checkSchema(UserAuthSchema, ["body"]),
  validate,
  createSession
);

export default AuthRouter;
