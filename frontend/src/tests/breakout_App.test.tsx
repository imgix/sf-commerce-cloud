import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "../components";

describe("breakout", () => {
  test("renders the correct cartridge bundle", () => {
    render(<App />);
    const linkElement = screen.getByText(/breakout/i);

    expect(linkElement).toBeInTheDocument();
  });
});
