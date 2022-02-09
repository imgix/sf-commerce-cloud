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
    const htmlElement = screen.getByTestId("custom-attribute");

    expect(htmlElement).toBeInTheDocument();
  });

  describe("should render extension custom UI", () => {
    test("should render add image button", async () => {
      render(<WithExtension />);

      await waitFor(() => {
        const addImageButton = screen.getByText("Add Image")
        expect(addImageButton).toBeInTheDocument();
      })
    })
  });
});
