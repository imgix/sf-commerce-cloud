import { render, screen } from "@testing-library/react";
import React from "react";
import { App as SidebarApp } from "../../components/SidebarApp";

describe("sidebar", () => {
  test("renders the correct cartridge bundle", () => {
    render(
      <SidebarApp
        value={undefined}
        onOpenBreakoutClick={() => {}}
        onClear={() => {}}
      />
    );
    const linkElement = screen.getByText(/Add image/i);

    expect(linkElement).toBeInTheDocument();
  });
});
