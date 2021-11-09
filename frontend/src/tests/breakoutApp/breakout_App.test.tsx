import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "../../components";

describe("breakout", () => {
  test("renders the correct cartridge bundle", () => {
    render(<App />);
    // TODO: give tests access to a real API key.
    const htmlElement = screen.getByText(/No sources/i);

    expect(htmlElement).toBeInTheDocument();
  });
});
