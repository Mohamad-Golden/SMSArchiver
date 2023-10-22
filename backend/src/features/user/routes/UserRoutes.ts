import { Request, Response } from "express";
import { createRepo, getRepo } from "../repos/UserRepo";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { matchedData } from "express-validator";
import { UserCreate } from "../models/UserModel";

export async function get(req: Request, res: Response): Promise<Response> {
  const data = matchedData(req) as { id: string };
  const user = await getRepo(data.id);
  return res.json(user);

  // const user = UserRepo.get(req.params.id);
  // return res.status(HttpStatusCodes.OK).json(user);
}

export async function create(req: Request, res: Response): Promise<Response> {
  const userData = matchedData(req) as UserCreate;
  await createRepo(userData);
  return res.status(HttpStatusCodes.CREATED).json({ msg: "user created" });
}
