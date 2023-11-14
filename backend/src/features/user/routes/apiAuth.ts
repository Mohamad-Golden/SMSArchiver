import Paths from "@src/constants/Paths";
import { Router } from "express";
import { get } from "./UserRoutes";

const userAuthRouter = Router();

userAuthRouter.get(Paths.Users.Get, get);

export default userAuthRouter;
