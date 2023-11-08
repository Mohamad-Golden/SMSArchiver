import { NextFunction, Request, Response } from "express";
import { getSessionRepo } from "../repos/AuthRepo";
import { RouteError } from "@src/other/classes";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { unauthenticated } from "@src/constants/routeErrors";
import { getFullUserRepo } from "@src/features/user/repos/UserRepo";

export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res;
  next;
  const now = new Date();
  const expireDate = now.setHours(now.getHours() + 1);
  const session =
    req.cookies.SessionId &&
    (await getSessionRepo({
      value: req.cookies.SessionId,
      createdAt: { lt: expireDate },
    }));
  if (session) {
    const user = await getFullUserRepo({ id: session.userId });
    res.locals.currentUser = user;
    next();
  } else {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, [unauthenticated()]);
  }
}
