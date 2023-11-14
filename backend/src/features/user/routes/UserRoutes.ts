import { Request, Response } from "express";
import { createRepo } from "../repos/UserRepo";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { matchedData } from "express-validator";
import { UserCreate } from "../models/UserModel";
import PwdUtil from "@src/util/PwdUtil";
import { Res } from "@src/types/types";

export function get(req: Request, res: Res): Response {
  const { phone, name, id } = res.locals.currentUser;
  return res.status(HttpStatusCodes.ACCEPTED).json({ phone, name, id });
}

export async function create(req: Request, res: Response): Promise<Response> {
  const userData = matchedData(req) as UserCreate;
  const hashedPassword = await PwdUtil.getHash(userData.password);

  const createdUser = await createRepo({
    hashedPassword,
    name: userData.name,
    phone: userData.phone,
  });
  return res.status(HttpStatusCodes.CREATED).json({
    msg: "user created",
    user: {
      id: createdUser.id,
      name: createdUser.name,
      phone: createdUser.phone,
    },
  });
}
