import { RouteError } from "@src/other/classes";
import { dbClient } from "@src/PrismaClient";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Prisma } from "@prisma/client";
import { UserCreateDB } from "../models/UserModel";
import { conflict, notFound } from "@src/constants/routeErrors";
// import { Prisma } from "@prisma/client";

export async function getRepo(id: string) {
  const user = await dbClient.user.findUnique({
    where: { id },
    select: Prisma.validator<Prisma.UserSelect>()({
      id: true,
      phone: true,
      name: true,
    }),
  });
  if (user) return user;
  throw new RouteError(HttpStatusCodes.NOT_FOUND, [notFound()]);
}

export async function createRepo(user: UserCreateDB) {
  try {
    return await dbClient.user.create({ data: user });
  } catch (err) {
    throw new RouteError(HttpStatusCodes.CONFLICT, [
      conflict(undefined, "phone"),
    ]);
  }
}

export async function getFullUserRepo(phone: string) {
  const user = await dbClient.user.findUnique({
    where: { phone },
  });
  if (user) return user;
  throw new RouteError(HttpStatusCodes.NOT_FOUND, [notFound()]);
}
