import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "../../components";

describe("sidebar", () => {
  test("renders the correct cartridge bundle", () => {
    render(<App />);
    const linkElement = screen.getByText(/sidebar/i);

    expect(linkElement).toBeInTheDocument();
  });
});
