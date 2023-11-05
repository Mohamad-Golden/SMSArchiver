import { Request, Response } from "express";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { matchedData } from "express-validator";
import { createSessionRepo } from "../repos/AuthRepo";
// import { Prisma } from "@prisma/client";
import { UserSession } from "../models/UserAuth";
import { getFullUserRepo } from "@src/features/user/repos/UserRepo";
import PwdUtil from "@src/util/PwdUtil";
import { RouteError } from "@src/other/classes";
import EnvVars from "@src/constants/EnvVars";

// export async function deleteSession(
//   req: Request,
//   res: Response
// ): Promise<Response> {
//   return res.json({});
// const user = UserRepo.get(req.params.id);
// return res.status(HttpStatusCodes.OK).json(user);
// }

export async function createSession(
  req: Request,
  res: Response
): Promise<Response> {
  const userData = matchedData(req) as UserSession;
  const user = await getFullUserRepo(userData.phone);
  if (await PwdUtil.compare(userData.password, user.hashedPassword)) {
    const { value: sessionValue } = await createSessionRepo(user.id);
    const { Options } = EnvVars.CookieProps;
    return res
      .cookie("SessionId", sessionValue, Options)
      .status(HttpStatusCodes.CREATED)
      .json({ msg: "session created" });
  } else {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, [
      { type: "authentication", msg: "Not authenticated" },
    ]);
  }
}
