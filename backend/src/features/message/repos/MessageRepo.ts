import { ErrorDetail, RouteError } from "@src/other/classes";
import { CreateMessage } from "../models/Message";
import dbClient from "@src/PrismaClient";
import { conflict, notFound } from "@src/constants/routeErrors";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Prisma, Message } from "@prisma/client";

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

export async function messageInboxRepo(
  userId: string,
  size: number,
  offset: number
) {
  const messages = await dbClient.$queryRaw<Message[]>`
    SELECT u.id, u.phone, u.name, JSON_OBJECT(
      'id': "sub"."id",
      'text': "sub"."text",
      'fromId': "sub"."fromId",
      'toId': "sub"."toId",
      'createdAt': "sub"."createdAt"
    ) as "lastMessage"
    FROM (
        SELECT m.* , 
        CASE
            WHEN "m"."fromId" = ${userId} THEN "m"."toId"
            WHEN "m"."toId" = ${userId} THEN "m"."fromId"
        END AS targetUserId
        FROM "Message" "m" 
        WHERE "m"."createdAt" = (
            SELECT MAX("m2"."createdAt")
            FROM "Message" "m2"
            WHERE 
                ("m2"."fromId" = "m"."fromId" AND "m2"."toId" = "m"."toId") OR
                ("m2"."fromId" = "m"."toId" AND "m2"."toId" = "m"."fromId")
            ) AND ("m"."fromId" = ${userId} OR "m"."toId" = ${userId})
        ORDER BY "m"."createdAt" DESC LIMIT ${size} OFFSET ${offset}
    ) AS sub
    LEFT JOIN "User" u ON sub.targetUserId = u.id;
  `;
  return messages;
}

export async function listMessageRepo(args: Prisma.MessageFindManyArgs) {
  const messages = await dbClient.message.findMany(args);
  return messages;
}
