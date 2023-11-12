import { NextFunction, Request, Response } from "express";
import { getSessionRepo } from "../repos/AuthRepo";
import { RouteError } from "@src/other/classes";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { unauthenticated } from "@src/constants/routeErrors";
import EnvVars from "@src/constants/EnvVars";
import { getFullUserRepo } from "@src/features/user/repos/UserRepo";

export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res;
  next;
  const now = new Date();
  const expireDate = new Date(
    now.getTime() - EnvVars.CookieProps.Options.maxAge
  );
  if (!req.cookies.SessionId)
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, [unauthenticated()]);

  const session = await getSessionRepo({
    value: req.cookies.SessionId,
    createdAt: { gt: expireDate },
  });

  const user = await getFullUserRepo(
    { id: session.userId },
    HttpStatusCodes.UNAUTHORIZED,
    [unauthenticated()]
  );
  res.locals.currentUser = user;
  next();
}
