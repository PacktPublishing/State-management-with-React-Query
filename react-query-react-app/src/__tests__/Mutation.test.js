import { axiosInstance } from "../api/userAPI";
import {
  SimpleMutation,
  OptimisticMutation,
  ConcurrentMutations,
  MutationWithSideEffects,
} from "../Mutation";
import { render, screen, waitFor } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";

const postSpy = jest.spyOn(axiosInstance, "post");
const consoleSpy = jest.spyOn(console, "log");

describe("Mutation Tests", () => {
  test("OptimisticMutation: data is sent to the server", async () => {
    const name = "Daniel";
    const age = "40";
    render(<OptimisticMutation />);
    const data = await screen.findByText(/admin/i);
    expect(data).toBeInTheDocument();

    const textInput = screen.getByRole("textbox");
    userEvent.type(textInput, name);
    const ageInput = screen.getByRole("spinbutton");
    userEvent.type(ageInput, age);
    userEvent.click(
      screen.getByRole("button", {
        name: /add/i,
      })
    );
    await waitFor(() =>
      expect(postSpy.mock.calls[0][1]).toEqual({ name, age: Number(age) })
    );
  });

  test("SimpleMutation: data is sent to the server", async () => {
    const name = "Daniel";
    render(<SimpleMutation />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, name);
    userEvent.click(
      screen.getByRole("button", {
        name: /add/i,
      })
    );
    await waitFor(() =>
      expect(postSpy.mock.calls[0][1]).toEqual({ name, age: 0 })
    );
  });

  test("SimpleMutation: on no network should display information", async () => {
    jest.spyOn(navigator, "onLine", "get").mockReturnValue(false);
    render(<SimpleMutation />);
    userEvent.click(
      screen.getByRole("button", {
        name: /add/i,
      })
    );
    await screen.findByText("Waiting for network to come back");
  });

  test("ConcurrentMutations: data is sent to the server", async () => {
    const name = "Daniel";
    render(<ConcurrentMutations />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, name);
    userEvent.click(
      screen.getByRole("button", {
        name: /add/i,
      })
    );
    await waitFor(() => expect(postSpy).toHaveBeenCalledTimes(2));
    expect(postSpy.mock.calls[0][1]).toEqual({ name, age: 99 });
    expect(postSpy.mock.calls[1][1]).toEqual({ name, age: 99 });
  });

  test("MutationWithSideEffects: data is sent to the server", async () => {
    const name = "Daniel";
    render(<MutationWithSideEffects />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, name);
    userEvent.click(
      screen.getByRole("button", {
        name: /add/i,
      })
    );
    await waitFor(() => expect(postSpy).toHaveBeenCalledTimes(1));
    expect(postSpy.mock.calls[0][1]).toEqual({ name, age: 99 });
  });

  test("MutationWithSideEffects: events are triggered", async () => {
    postSpy.mockRestore();
    const name = "Daniel";
    render(<MutationWithSideEffects />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, name);
    userEvent.click(
      screen.getByRole("button", {
        name: /add/i,
      })
    );

    await waitFor(() => expect(consoleSpy).toHaveBeenCalledTimes(2));
    expect(consoleSpy).toHaveBeenCalledWith("toast");
    expect(consoleSpy).toHaveBeenCalledWith("/user/999");
  });
});
