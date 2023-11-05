export interface UserCreate {
  phone: string;
  name: string;
  password: string;
}

export type UserCreateDB = {
  phone: string;
  name: string;
  hashedPassword: string;
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
};
