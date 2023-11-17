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
import {
  InputCursorPagination,
  InputOffsetPagination,
} from "@src/models/Pagination";
import { cursorPagination, getNextPage } from "@src/constants/Pagination";

export async function createMessage(req: Request, res: Res): Promise<Res> {
  const inputData = matchedData(req) as CreateMessageInput;
  const messageData = { ...inputData, fromId: res.locals.currentUser.id };
  const newMessage = await createMessageRepo(messageData);
  return res.status(HttpStatusCodes.CREATED).json(newMessage);
}

export async function getMessage(req: Request, res: Res): Promise<Res> {
  const inputData = matchedData(req) as { id: string };
  const message = await getMessageRepo({ id: inputData.id });
  return res.status(HttpStatusCodes.OK).json(message);
}

export async function messageInbox(req: Request, res: Res): Promise<Res> {
  const { size, offset } = matchedData(req) as InputOffsetPagination;
  const messageList = await messageInboxRepo(
    res.locals.currentUser.id,
    size,
    offset
  );
  return res
    .status(HttpStatusCodes.OK)
    .json({ users: messageList, offset: offset });
}

export async function listMessage(req: Request, res: Res): Promise<Res> {
  const inputData = matchedData(req) as MessageList & InputCursorPagination;
  const messageList = await listMessageRepo({
    where: {
      OR: [
        { fromId: res.locals.currentUser.id, toId: inputData.toId },
        { fromId: inputData.toId, toId: res.locals.currentUser.id },
      ],
    },
    ...cursorPagination(inputData.size, inputData.cursor),
  });

  return res
    .status(HttpStatusCodes.OK)
    .json({ messages: messageList, nextPage: getNextPage(messageList) });
}
