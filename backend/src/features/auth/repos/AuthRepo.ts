import { Prisma } from "@prisma/client";
import dbClient from "@src/PrismaClient";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { conflict, unauthenticated } from "@src/constants/routeErrors";
import { RouteError } from "@src/other/classes";

export async function createSessionRepo(userId: string) {
  try {
    return await dbClient.session.create({ data: { userId: userId } });
  } catch (err) {
    throw new RouteError(HttpStatusCodes.CONFLICT, [
      conflict(undefined, "value"),
    ]);
  }
}

export async function getSessionRepo(where: Prisma.SessionWhereUniqueInput) {
  try {
    return await dbClient.session.findUnique({ where: where });
  } catch (err) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, [unauthenticated()]);
  }
}

export async function deleteSessionRepo() {}
