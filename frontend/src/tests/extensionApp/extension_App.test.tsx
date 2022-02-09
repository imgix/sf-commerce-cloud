import { render, screen, waitFor } from "@testing-library/react";
import { WithExtension } from "../../stories/extension/products.stories";

describe("extension", () => {
  test("should render sfcc custom attribute scaffolding", () => {
    render(<WithExtension />)
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
