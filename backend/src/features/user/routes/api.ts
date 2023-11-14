import Paths from "@src/constants/Paths";
import { Router } from "express";
import { create } from "./UserRoutes";
import validate from "@src/util/validator";
import { checkSchema } from "express-validator";
import { UserCreateSchema } from "../models/UserModel";

const userRouter = Router();

userRouter.post(
  Paths.Users.Create,
  checkSchema(UserCreateSchema, ["body"]),
  validate,
  create
);
export default userRouter;
