import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "../components";

describe("int_imgix_pd", () => {
  test("renders the correct cartridge bundle", () => {
    render(<App />);
    const linkElement = screen.getByText(new RegExp("int"));

    expect(linkElement).toBeInTheDocument();
  });
});
