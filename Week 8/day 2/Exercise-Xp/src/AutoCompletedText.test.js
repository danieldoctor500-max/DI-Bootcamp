import { fireEvent, render, screen } from "@testing-library/react";
import AutoCompletedText from "./AutoCompletedText";

test("filters country suggestions as the user types", () => {
  render(<AutoCompletedText />);

  fireEvent.change(screen.getByLabelText(/country/i), {
    target: { value: "can" },
  });

  expect(screen.getByRole("button", { name: "Canada" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "France" })).not.toBeInTheDocument();
});

test("selecting a suggestion fills the input and clears the suggestions", () => {
  render(<AutoCompletedText />);
  const input = screen.getByLabelText(/country/i);

  fireEvent.change(input, { target: { value: "can" } });
  fireEvent.click(screen.getByRole("button", { name: "Canada" }));

  expect(input).toHaveValue("Canada");
  expect(screen.queryByRole("button", { name: "Canada" })).not.toBeInTheDocument();
});
