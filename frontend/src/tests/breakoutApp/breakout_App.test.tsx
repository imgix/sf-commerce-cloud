import { render, screen } from "@testing-library/react";
import React from "react";
import { App as BreakoutApp } from "../../components/BreakoutApp";

describe("breakout", () => {
  test("renders the correct cartridge bundle", () => {
    render(<BreakoutApp apiKey="" onSubmit={() => {}} />);
    const htmlElement = screen.getByText(/No sources/i);

    expect(htmlElement).toBeInTheDocument();
  });
});
