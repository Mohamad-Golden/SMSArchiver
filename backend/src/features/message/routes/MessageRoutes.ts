import { Res } from "@src/types/types";
import { matchedData } from "express-validator";
import { CreateMessageInput } from "../models/Message";
import { getMessageRepo, createMessageRepo, listMessageRepo } from "../repos/MessageRepo";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Request } from "express";

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

export async function listMessage(req: Request, res: Res): Promise<Res> {
  const messageList = await listMessageRepo('');
  return res.status(HttpStatusCodes.ACCEPTED).json(messageList);
}
