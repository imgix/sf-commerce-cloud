import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "../components";

describe("bm_imgix_pd", () => {
  test("renders the correct cartridge bundle", () => {
    render(<App />);
    const linkElement = screen.getByText(new RegExp("bm"));

    expect(linkElement).toBeInTheDocument();
  });
});
