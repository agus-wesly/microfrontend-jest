import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { Search } from "./App";

describe("App", () => {
  it("Should render the app", async () => {
    render(<App />);
    screen.getByRole("textbox", {});
  });

  it("Should change input", async () => {
    render(<App />);
    await screen.findByText(/Signed in as/);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: {
        value: "Javascript",
      },
    });
  });

  it("Should display text after input", async () => {
    render(<App />);
    expect(screen.queryByText(/Javascript/)).toBeNull();

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Typescript");

    const element = screen.getByText(/Typescript/);
    expect(element).toBeInTheDocument();
  });
});

describe("Search", () => {
  it("Call the callback fn", async () => {
    const onChange = jest.fn();
    render(<Search value={""} onChange={onChange}></Search>);

    await userEvent.type(screen.getByRole("textbox"), "Typescript");
    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
