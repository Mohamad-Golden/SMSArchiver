export type UserSession = {
  phone: string;
  password: string;
};

export type Session = {
  userId: string,
  value: string
}

export const UserAuthSchema = {
  phone: {
    isLength: {
      options: {
        min: 10,
        max: 11,
      },
    },
    notEmpty: true,
  },
  password: {
    //TODO needs regex too
    isLength: {
      options: {
        min: 8,
        max: 120,
      },
    },
    notEmpty: true,
  },
};
