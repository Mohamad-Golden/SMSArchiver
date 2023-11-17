import EnvVars from "@src/constants/EnvVars";

export type InputOffsetPagination = {
  offset: number;
  size: number;
};

export type InputCursorPagination = {
  cursor?: string;
  size: number;
};

export const CursorPaginationSchema = {
  cursor: {
    isLength: {
      options: {
        min: 1,
        max: 48,
      },
    },
    notEmpty: false,
    optional: true,
  },
  size: {
    notEmpty: false,
    optional: true,
    default: {
      options: EnvVars.PaginationSize,
    },
    isInt: true,
    toInt: true,
  },
};

export const OffsetPaginationSchema = {
  offset: {
    notEmpty: false,
    default: {
      options: 0,
    },
    isInt: true,
    toInt: true,
  },
  size: {
    notEmpty: false,
    default: {
      options: EnvVars.PaginationSize,
    },
    isInt: true,
    toInt: true,
  },
};
