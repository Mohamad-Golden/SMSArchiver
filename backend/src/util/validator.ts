import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
}

export default validate;
