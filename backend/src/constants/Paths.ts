/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Swagger: "/docs",
  Auth: {
    Base: "/auth",
    Authenticate: "/authenticate",
    Revoke: "/revoke",
    Refresh: "/refresh",
  },
  Users: {
    Base: "/users",
    AuthBase: "/authUsers",
    Get: "",
    Create: "/create",
    Update: "/update",
    Delete: "/delete/:id",
  },
  Message: {
    Base: "/msg",
    GetList: "/list",
    Inbox: "/inbox",
    Get: "",
    Create: "/create",
    Delete: "/delete",
  },
} as const;
