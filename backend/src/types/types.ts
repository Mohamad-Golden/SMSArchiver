import * as e from "express";
import { Query } from "express-serve-static-core";
import { Cookies } from "./express";


export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IReqQuery<T extends Query, U = void> extends e.Request {
  query: T;
  body: U;
}

export interface IRes extends e.Response {
  signedCookies: Record<string, string>;
  cookies: Cookies;
}
