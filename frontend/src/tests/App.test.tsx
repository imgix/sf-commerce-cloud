import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "../components/";

test.skip("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
