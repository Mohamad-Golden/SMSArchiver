import { RouteError } from "@src/other/classes";
import { UserCreate } from "../models/UserModel";
import { dbClient } from "@src/PrismaClient";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Prisma } from "@prisma/client";

export async function getRepo(id: string): Promise<UserCreate> {
  return await dbClient.user.findUnique({ where: { id: id } });
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
