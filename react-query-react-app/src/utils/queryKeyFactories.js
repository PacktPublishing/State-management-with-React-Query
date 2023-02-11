export const userKeys = {
  all: () => ["allUsers"],
  api: () => [{ queryIdentifier: "api" }],
  withUsername: (username = "username") => [{ ...userKeys.api()[0], username }],
  paginated: (page) => [{ ...userKeys.api(), page }],
};
