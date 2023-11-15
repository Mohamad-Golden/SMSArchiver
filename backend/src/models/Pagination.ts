export type InputPagination = {
  cursor?: number;
};

export const PaginationSchema = {
  cursor: {
    isLength: {
      options: {
        min: 1,
        max: 11,
      },
    },
    notEmpty: false,
  },
};
