export interface UserCreate {
  phone: string;
  name?: string;
  password: string;
}

export type UserCreateDB = {
  phone: string;
  name?: string | null;
  hashedPassword: string;
};

export type UserModel = UserCreateDB & {
  id: string;
  lastActionAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const UserCreateSchema = {
  phone: {
    isLength: {
      options: {
        min: 10,
        max: 11,
      },
    },
    notEmpty: true,
  },
  name: {
    isLength: {
      options: {
        min: 3,
        max: 120,
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
