import { rest } from "msw";

export const handlers = [
  rest.get("*/react-query-api/*", (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        hello: req.params[1],
      })
    );
  }),
  rest.post("*/name-api", (req, res, ctx) => {
    return res(ctx.json({ name: "Daniel", age: 40, userID: 999 }));
  }),
  rest.post("*/name-api/*", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        hello: "user",
      })
    );
  }),
  rest.get("*/name-api", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          userID: 1,
          name: "admin",
          age: 25,
        },
      ])
    );
  }),
];
