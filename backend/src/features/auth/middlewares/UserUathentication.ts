import { NextFunction, Request, Response } from "express";

export default async function UserAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return next();
}
