import { RouteError } from "@src/other/classes";
import { UserCreate } from "../models/UserModel";
import { dbClient } from "@src/PrismaClient";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
// import { Prisma } from "@prisma/client";

export async function getRepo(id: string) {
  const user = await dbClient.user.findUnique({ where: { id: id } });
  if (user) return user;
  throw new RouteError(HttpStatusCodes.NOT_FOUND, [
    { type: "not found", msg: "Not found" },
  ]);
}

export async function createRepo(user: UserCreate) {
  try {
    await dbClient.user.create({ data: user });
  } catch (err) {
    throw new RouteError(HttpStatusCodes.CONFLICT, [
      { type: "conflict", msg: "There is a conflict", path: "phone" },
    ]);
  }
}
