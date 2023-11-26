export type CreateMessageInput = {
  text: string;
  toId: string;
};
export type CreateMessage = CreateMessageInput & {
  fromId: string;
};

export const CreateMessageSchema = {
  text: {
    notEmpty: true,
  },
  toId: {
    isLength: {
      options: {
        min: 36,
        max: 36,
      },
    },
    notEmpty: true,
  },
};

export const MessageListSchema = {
  toId: {
    notEmpty: true,
  },
};

export type MessageList = {
  toId: string;
};
