import { render } from "@testing-library/react";

import OutputCardContainer from ".";

type MockProps = {
  originalText: string;
};

jest.mock("../OutputCard", () => ({
  __esModule: true,
  default: ({ originalText }: { originalText: MockProps }) => (
    <li>{originalText}</li>
  ),
}));

describe("OutputCardContainer component", () => {
  it("should render an initially empty list", () => {
    const { getByRole, queryByRole } = render(
      <OutputCardContainer cards={[]} />
    );

    expect(getByRole("list")).toBeInTheDocument();
    expect(queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("should display an OutputCard when provided with an array of one data element ", () => {
    const { getByRole, queryAllByRole } = render(
      <OutputCardContainer cards={[{ originalText: "hello" }]} />
    );

    expect(getByRole("list")).toBeInTheDocument();
    expect(queryAllByRole("listitem").length).toBe(1);
    expect(queryAllByRole("listitem")[0]).toHaveTextContent("hello");
  });

  it("should display three OutputCards when provided with an array of three data elements in order, with most recent first ", () => {
    const { getByRole, queryAllByRole } = render(
      <OutputCardContainer
        cards={[
          { originalText: "oldest" },
          { originalText: "old" },
          { originalText: "most recent" },
        ]}
      />
    );

    expect(getByRole("list")).toBeInTheDocument();
    expect(queryAllByRole("listitem").length).toBe(3);
    expect(queryAllByRole("listitem")[0]).toHaveTextContent("most recent");
    expect(queryAllByRole("listitem")[1]).toHaveTextContent("old");
    expect(queryAllByRole("listitem")[2]).toHaveTextContent("oldest");
  });
});
