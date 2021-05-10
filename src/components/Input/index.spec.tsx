import { render, fireEvent } from "@testing-library/react";

import Input from ".";

describe("Input component", () => {
  it("should be empty by default", () => {
    const { getByRole } = render(<Input setValue={() => {}} />);

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("");
  });

  it("should render the value prop", () => {
    const { getByRole } = render(<Input value="hello" setValue={() => {}} />);

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("hello");
  });

  it("should call setValue upon new input", () => {
    const mockCallback = jest.fn();

    const { getByRole } = render(<Input setValue={mockCallback} />);

    const input: HTMLInputElement = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "hi" } });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith("hi");
  });

  it("should have an accessible label", () => {
    const { getByLabelText } = render(<Input setValue={() => {}} />);

    expect(getByLabelText("What do you want to convert?")).toBeInTheDocument();
  });
});
