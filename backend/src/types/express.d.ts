import { UserModel } from "@src/features/user/models/UserModel";
import "express";

// **** Declaration Merging **** //

type Cookies = {
  SessionId?: string;
};

declare module "express" {
  export interface Request {
    signedCookies: Record<string, string>;
    cookies: Cookies;
  }
  export interface Response {
    locals: {
      currentUser?: UserModel;
    };
  }
}
