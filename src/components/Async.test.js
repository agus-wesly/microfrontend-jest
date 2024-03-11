import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AsyncComponent from "./Async";

describe("Async component", () => {
  it("Should fetch the data when button clicked", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            hits: [
              { objectID: "1", title: "Javascript" },
              { objectID: "2", title: "Typescript" },
            ],
          }),
      }),
    );
    render(<AsyncComponent />);

    const buttonElement = screen.getByRole("button");

    await userEvent.click(buttonElement);

    expect(await screen.findAllByRole("listitem")).toHaveLength(2);
  });

  it("Should show error when fetch failed", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error()));

    render(<AsyncComponent />);

    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);

    expect(
      await screen.findByText("Something went wrong ..."),
    ).toBeInTheDocument();
  });
});
