import { render, screen, waitFor } from "@testing-library/react";
import { WithExtension } from "../../stories/extension/products.stories";

const cleanupPortal = () => {
  // cleanup, close modal
  const portal = document.querySelector("[data-testid=portal-wrapper]");
  // remove each child element from the portal
  portal?.childNodes.forEach((child) => portal.removeChild(child));
};

describe("extension", () => {
  afterEach(() => {
    cleanupPortal();
  });

  test("should render sfcc custom attribute scaffolding", async () => {
    render(<WithExtension />);
    const htmlElement = screen.getByTestId("custom-attribute");

    await waitFor(() => {
      screen.getByText("Add Image");
    });

    expect(htmlElement).toBeInTheDocument();
  });

  test("should render add image button", async () => {
    render(<WithExtension />);

    await waitFor(() => {
      screen.getByText("Add Image");
    });
    expect(screen.getByText("Add Image")).toBeInTheDocument();
  });

  test("should render asset cards", async () => {
    render(<WithExtension />);

    await waitFor(() => {
      expect(screen.getByText("amsterdam.jpg")).toBeInTheDocument();
    });
  });
});
