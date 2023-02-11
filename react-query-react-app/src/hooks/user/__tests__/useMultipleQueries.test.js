import useMultipleQueries from "../useMultipleQueries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useMultipleQueries", () => {
  test("should fetch all data", async () => {
    const { result, waitFor } = renderHook(() => useMultipleQueries(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.queryOneData).toBeDefined());
    expect(result.current.queryOneData.hello).toBe("userOne");
    expect(result.current.queryTwoData.hello).toBe("userTwo");
    expect(result.current.queryThreeData.hello).toBe("userThree");
  });
});
