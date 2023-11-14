import * as e from "express";
import { Query } from "express-serve-static-core";
import { UserModel } from "@src/features/user/models/UserModel";

export interface Req<T = void> extends e.Request {
  body: T;
}

export interface IReqQuery<T extends Query, U = void> extends e.Request {
  query: T;
  body: U;
}
export type Res = e.Response<any, { currentUser: UserModel }>;

// export interface IRes extends e.Response {
//   locals: ILocals;
// }
