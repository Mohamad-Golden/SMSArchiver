export const notFound = (msg?: string, path?: string) => ({
  type: "not found",
  msg: msg ?? "Not found",
  ...(path && { path }),
});
export const unauthenticated = (msg?: string, path?: string) => ({
  type: "unauthenticated",
  msg: msg ?? "Not authenticated",
  ...(path && { path }),
});
export const badRequest = (msg?: string, path?: string) => ({
  type: "bad request",
  msg: msg ?? "Bad request",
  ...(path && { path }),
});
export const conflict = (msg?: string, path?: string) => ({
  type: "conflict",
  msg: msg ?? "There is a conflict",
  ...(path && { path }),
});