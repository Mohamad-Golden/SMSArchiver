export interface UserCreate {
  phone: string;
  name: string;
}

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
