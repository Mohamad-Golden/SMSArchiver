import { Request, Response } from "express";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { matchedData } from "express-validator";
import {
  createSessionRepo,
  deleteSessionRepo,
  updateSessionRepo,
} from "../repos/SessionRepo";
import { UserSession } from "../models/UserAuth";
import { getFullUserRepo } from "@src/features/user/repos/UserRepo";
import PwdUtil from "@src/util/PwdUtil";
import { RouteError } from "@src/other/classes";
import EnvVars from "@src/constants/EnvVars";
import { badRequest, unauthenticated } from "@src/constants/routeErrors";
import { generateSession } from "../utils/session";

export async function createSession(
  req: Request,
  res: Response
): Promise<Response> {
  const userData = matchedData(req) as UserSession;
  const user = await getFullUserRepo(
    { phone: userData.phone },
    HttpStatusCodes.BAD_REQUEST,
    [badRequest("invalid credentials")]
  );
  if (await PwdUtil.compare(userData.password, user.hashedPassword)) {
    const { value: sessionValue } = await createSessionRepo({
      userId: user.id,
      value: await generateSession(),
    });
    return res
      .cookie(
        EnvVars.CookieProps.Key,
        sessionValue,
        EnvVars.CookieProps.Options
      )
      .status(HttpStatusCodes.CREATED)
      .json({ msg: "Session created" });
  } else {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, [
      badRequest("invalid credentials"),
    ]);
  }
}

export async function revokeSession(
  req: Request,
  res: Response
): Promise<Response> {
  await deleteSessionRepo({ value: req.signedCookies.SessionId });
  return res
    .clearCookie(EnvVars.CookieProps.Key)
    .status(HttpStatusCodes.OK)
    .end();
}

export async function refreshSession(
  req: Request,
  res: Response
): Promise<Response> {
  const now = new Date();
  const expireDate = new Date(
    now.getTime() - EnvVars.CookieProps.Options.maxAge
  );
  if (!req.signedCookies.SessionId)
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, [unauthenticated()]);
  const newSession = await updateSessionRepo(
    {
      value: req.signedCookies.SessionId,
      updatedAt: { lt: expireDate },
    },
    { value: await generateSession() }
  );
  return res
    .cookie(
      EnvVars.CookieProps.Key,
      newSession.value,
      EnvVars.CookieProps.Options
    )
    .status(HttpStatusCodes.OK)
    .json({ msg: "Session updated" });
}
