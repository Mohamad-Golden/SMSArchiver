import Paths from "@src/constants/Paths";
import { Router } from "express";
import { create, get } from "./UserRoutes";
import validate from "@src/util/validator";
import {  checkSchema,  query } from "express-validator";
import { UserCreateSchema } from "../models/UserModel";

const userRouter = Router();

userRouter.get(
  Paths.Users.Get,
  query("id").notEmpty().escape(),
  validate,
  get
);

userRouter.post(
  Paths.Users.Create,
  checkSchema(UserCreateSchema),
  validate,
  create
);
export default userRouter;

