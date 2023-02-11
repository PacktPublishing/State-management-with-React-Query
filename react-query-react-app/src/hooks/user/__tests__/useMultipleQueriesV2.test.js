import useMultipleQueriesV2 from "../useMultipleQueriesV2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useMultipleQueriesV2", () => {
  test("should fetch all data", async () => {
    const { result, waitFor } = renderHook(() => useMultipleQueriesV2(), {
      wrapper,
    });
    await waitFor(() =>
      expect(result.current.multipleQueries[0].data.hello).toBeDefined()
    );

    expect(result.current.multipleQueries[0].data.hello).toBe("userOne");
    expect(result.current.multipleQueries[1].data.hello).toBe("userTwo");
    expect(result.current.multipleQueries[2].data.hello).toBe("userThree");
  });
});
