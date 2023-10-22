/**
 * Miscellaneous shared classes go here.
 */

import HttpStatusCodes from "@src/constants/HttpStatusCodes";

type Errors = {
  type: string;
  msg?: string;
  path?: string
}[];
/**
 * Error with status code and message
 */
export class RouteError extends Error {
  public status: HttpStatusCodes;
  public errors: Errors;

  public constructor(status: HttpStatusCodes, errors: Errors) {
    super("error");
    this.errors = errors;
    this.status = status;
  }
}
