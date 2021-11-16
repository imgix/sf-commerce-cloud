import { render, screen } from "@testing-library/react";
import React from "react";
import { App as SidebarApp } from "../../components/SidebarApp";

describe("sidebar", () => {
  test("renders the correct cartridge bundle", () => {
    render(<SidebarApp handleBreakoutOpen={() => {}} />);
    const linkElement = screen.getByText(/Select an image/i);

    expect(linkElement).toBeInTheDocument();
  });
});
