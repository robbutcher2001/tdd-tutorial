import { render } from "@testing-library/react";

import Button from ".";

describe("Button component", () => {
  it("should be enabled by default", () => {
    const { getByRole } = render(<Button label="" callback={() => {}} />);

    expect(getByRole("button")).toBeEnabled();
  });

  it("should be able to be disabled", () => {
    const { getByRole } = render(
      <Button disabled label="" callback={() => {}} />
    );

    expect(getByRole("button")).toBeDisabled();
  });

  it("should call the callback", () => {
    const mockCallback = jest.fn();

    const { getByRole } = render(<Button label="" callback={mockCallback} />);

    getByRole("button").click();

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should display passed prop text", () => {
    const { getByText, getByLabelText } = render(
      <Button label="lowercase_action" callback={() => {}}>
        Lowercase
      </Button>
    );

    expect(getByText("Lowercase")).toBeInTheDocument();
    expect(getByLabelText("lowercase_action")).toBeInTheDocument();
  });
});
