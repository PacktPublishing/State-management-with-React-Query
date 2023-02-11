import useOptimisticUpdateUserCreation from "../useOptimisticUpdateUserCreation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { userKeys } from "../../../utils/queryKeyFactories";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import { waitFor } from "@testing-library/react";

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: jest.fn(),
  },
});
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useOptimisticUpdateUserCreation", () => {
  test("should perform optimistic update", async () => {
    queryClient.setQueryData(userKeys.all(), []);
    const name = "user";
    const age = 20;
    const { result, waitFor } = renderHook(
      () => useOptimisticUpdateUserCreation(),
      {
        wrapper,
      }
    );

    result.current.mutate({ name, age });

    await waitFor(() =>
      expect(queryClient.getQueryData(userKeys.all())).toEqual([{ name, age }])
    );
  });

  test("should revert optimistic update", async () => {
    queryClient.setQueryData(userKeys.all(), []);
    const name = "user";
    const age = 20;
    server.use(rest.post("*", (req, res, ctx) => res(ctx.status(403))));

    const { result } = renderHook(() => useOptimisticUpdateUserCreation(), {
      wrapper,
    });

    result.current.mutate({ name, age });

    await waitFor(() => expect(result.current.isError).toBe(true));
    await waitFor(() =>
      expect(queryClient.getQueryData(userKeys.all())).toEqual([])
    );
  });
});
