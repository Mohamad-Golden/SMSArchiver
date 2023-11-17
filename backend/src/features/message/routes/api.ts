import Paths from "@src/constants/Paths";
import { Router } from "express";
import { checkSchema } from "express-validator";
import { CreateMessageSchema, MessageListSchema } from "../models/Message";
import validate from "@src/util/validator";
import { createMessage, listMessage, messageInbox } from "./MessageRoutes";
import {
  CursorPaginationSchema,
  OffsetPaginationSchema,
} from "@src/models/Pagination";

const messageRouter = Router();

messageRouter.post(
  Paths.Message.Create,
  checkSchema(CreateMessageSchema, ["body"]),
  validate,
  createMessage
);

messageRouter.get(
  Paths.Message.Inbox,
  checkSchema(OffsetPaginationSchema, ["query"]),
  validate,
  messageInbox
);

messageRouter.get(
  Paths.Message.GetList,
  checkSchema({ ...CursorPaginationSchema, ...MessageListSchema }, ["query"]),
  validate,
  listMessage
);

export default messageRouter;
