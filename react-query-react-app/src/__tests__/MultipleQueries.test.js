import { ExampleOne, ExampleTwo } from "../MultipleQueries";
import { render, screen } from "../utils/test-utils";

describe("MultipleQueries Tests", () => {
  test("ExampleOne: component fetches multiple data", async () => {
    render(<ExampleOne />);
    const text = await screen.findByText("userOne");
    expect(text).toBeInTheDocument();
    expect(screen.getByText("userTwo")).toBeInTheDocument();
    expect(screen.getByText("userThree")).toBeInTheDocument();
  });

  test("ExampleTwo: component fetches multiple data", async () => {
    render(<ExampleTwo />);
    const text = await screen.findByText("userOne");
    expect(text).toBeInTheDocument();
    expect(screen.getByText("userTwo")).toBeInTheDocument();
    expect(screen.getByText("userThree")).toBeInTheDocument();
  });

  test("ExampleTwo: component shows loading indicator for each query", async () => {
    render(<ExampleTwo />);
    const isFetching = screen.getAllByText("Fetching data...");
    expect(isFetching).toHaveLength(3);
  });
});
