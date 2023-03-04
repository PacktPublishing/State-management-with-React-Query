export const userKeys = {
  all: () => ["allUsers"],
  api: () => [{ queryIdentifier: "api" }],
  userMutation: () => ["userMutation"],
  withUsername: (username = "username") => [{ ...userKeys.api()[0], username }],
  paginated: (page) => [{ ...userKeys.api(), page }],
};
