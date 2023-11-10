/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Swagger: "docs",
  Auth: {
    Base: "/auth",
    Authenticate: "/authenticate",
    Revoke: "/revoke",
    Refresh: "/refresh",
  },
  Users: {
    Base: "/users",
    Get: "",
    Create: "/create",
    Update: "/update",
    Delete: "/delete/:id",
  },
} as const;
