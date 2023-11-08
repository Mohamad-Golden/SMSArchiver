/**
 * Miscellaneous shared classes go here.
 */

import HttpStatusCodes from "@src/constants/HttpStatusCodes";

export type ErrorDetail = {
  type: string;
  msg?: string;
  path?: string;
};
/**
 * Error with status code and message
 */
export class RouteError extends Error {
  public status: HttpStatusCodes;
  public errors: ErrorDetail[];

  public constructor(status: HttpStatusCodes, errors: ErrorDetail[]) {
    super("error");
    this.errors = errors;
    this.status = status;
  }
}
