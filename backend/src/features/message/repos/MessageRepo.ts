import { ErrorDetail, RouteError } from "@src/other/classes";
import { CreateMessage } from "../models/Message";
import dbClient from "@src/PrismaClient";
import { conflict, notFound } from "@src/constants/routeErrors";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Prisma } from "@prisma/client";

export async function createMessageRepo(
  data: CreateMessage,
  errorStatusCode?: number,
  errors?: ErrorDetail[]
) {
  try {
    return await dbClient.message.create({ data: data });
  } catch (err) {
    throw new RouteError(
      errorStatusCode ?? HttpStatusCodes.CONFLICT,
      errors ?? [conflict(undefined, "id")]
    );
  }
}

export async function getMessageRepo(
  where: Prisma.MessageWhereUniqueInput,
  errorStatusCode?: number,
  errors?: ErrorDetail[]
) {
  const message = await dbClient.message.findUnique({ where });
  if (message) return message;
  throw new RouteError(
    errorStatusCode ?? HttpStatusCodes.NOT_FOUND,
    errors ?? [notFound()]
  );
}

export async function listMessageRepo(queryString: string) {
  const messages = await dbClient.$queryRaw`${queryString}`;
  return messages;
}
