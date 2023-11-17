import Paths from "@src/constants/Paths";
import { Router } from "express";
// import { create, get } from "./UserRoutes";
import validate from "@src/util/validator";
import { checkSchema } from "express-validator";
import {
  createSession,
  refreshSession,
  revokeSession,
} from "./SessionRoutes";
import { UserAuthSchema } from "../models/UserAuth";

const AuthRouter = Router();

AuthRouter.post(
  Paths.Auth.Authenticate,
  checkSchema(UserAuthSchema, ["body"]),
  validate,
  createSession
);

AuthRouter.delete(Paths.Auth.Revoke, revokeSession);

AuthRouter.get(Paths.Auth.Refresh, refreshSession);

export default AuthRouter;
