import { Prisma } from "@prisma/client";
import dbClient from "@src/PrismaClient";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {
  conflict,
  notFound,
  unauthenticated,
} from "@src/constants/routeErrors";
import { RouteError } from "@src/other/classes";
import { Session } from "../models/UserAuth";

export async function createSessionRepo(data: Session) {
  try {
    return await dbClient.session.create({
      data,
    });
  } catch (err) {
    throw new RouteError(HttpStatusCodes.CONFLICT, [
      conflict(undefined, "value"),
    ]);
  }
}

export async function deleteSessionRepo(where: Prisma.SessionWhereUniqueInput) {
  try {
    return await dbClient.session.delete({ where: where });
  } catch (err) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, [notFound()]);
  }
}

export async function getSessionRepo(where: Prisma.SessionWhereUniqueInput) {
  const session = await dbClient.session.findUnique({ where: where });
  if (session) return session;
  throw new RouteError(HttpStatusCodes.UNAUTHORIZED, [unauthenticated()]);
}

export async function updateSessionRepo(
  where: Prisma.SessionWhereUniqueInput,
  data: Record<string, string>
) {
  try {
    return await dbClient.session.update({ where: where, data: data });
  } catch (err) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, [notFound()]);
  }
}
