import { Res } from "@src/types/types";
import { matchedData } from "express-validator";
import { CreateMessageInput, MessageList } from "../models/Message";
import {
  getMessageRepo,
  createMessageRepo,
  messageInboxRepo,
  listMessageRepo,
} from "../repos/MessageRepo";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Request } from "express";
import { InputPagination } from "@src/models/Pagination";

export async function createMessage(req: Request, res: Res): Promise<Res> {
  const inputData = matchedData(req) as CreateMessageInput;
  const messageData = { ...inputData, fromId: res.locals.currentUser.id };
  const newMessage = await createMessageRepo(messageData);
  return res.status(HttpStatusCodes.CREATED).json(newMessage);
}

export async function getMessage(req: Request, res: Res): Promise<Res> {
  const inputData = matchedData(req) as { id: string };
  const message = await getMessageRepo({ id: inputData.id });
  return res.status(HttpStatusCodes.ACCEPTED).json(message);
}

export async function messageInbox(req: Request, res: Res): Promise<Res> {
  const messageList = await messageInboxRepo(res.locals.currentUser.id);
  return res.status(HttpStatusCodes.ACCEPTED).json(messageList);
}

export async function listMessage(req: Request, res: Res): Promise<Res> {
  const inputData = matchedData(req) as MessageList & InputPagination;
  const messageList = await listMessageRepo({
    where: {
      OR: [
        { fromId: res.locals.currentUser.id, toId: inputData.toId },
        { fromId: inputData.toId, toId: res.locals.currentUser.id },
      ],
    },
    // cursor: { id: inputData.cursor },
    skip: 1,
  });
  return res.status(HttpStatusCodes.ACCEPTED).json(messageList);
}
