import Paths from "@src/constants/Paths";
import { Router } from "express";
import { checkSchema } from "express-validator";
import { CreateMessageSchema } from "../models/Message";
import validate from "@src/util/validator";
import { createMessage } from "./MessageRoutes";

const messageRouter = Router();

messageRouter.post(
  Paths.Message.Create,
  checkSchema(CreateMessageSchema, ["body"]),
  validate,
  createMessage
);
