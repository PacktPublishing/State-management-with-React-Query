import { rest } from 'msw'

export const handlers = [
    rest.get('*/react-query-api/*', (req, res, ctx) => {
        return res(
            ctx.delay(500),
            ctx.status(200),
            ctx.json({
              hello: req.params[1],
            }),
          )
    }),
  ]