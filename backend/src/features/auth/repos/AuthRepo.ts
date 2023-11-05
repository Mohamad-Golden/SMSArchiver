import dbClient from "@src/PrismaClient";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { conflict } from "@src/constants/routeErrors";
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
export async function deleteSessionRepo() {}
