import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
      expect(screen.getByText("cub.jpg")).toBeInTheDocument();
    });
  });

  test("should show replace button on asset card hover", async () => {
    render(<WithExtension />);

    await waitFor(() => {
      const assetCard = screen.getByText("cub.jpg");
      fireEvent.mouseOver(assetCard);
      screen.getByTestId("asset-card-replace-button");
    });

    const replaceButton = screen.getByTestId("asset-card-replace-button");
    expect(replaceButton).toBeInTheDocument();
  });

  test("should open modal when add image button is clicked", async () => {
    render(<WithExtension />);

    await waitFor(() => {
      const addImageButton = screen.getByText("Add Image");
      fireEvent.click(addImageButton);
    });

    expect(screen.getByText("Select a Source")).toBeInTheDocument();
  });

  test("should open IM modal when replace button is clicked", async () => {
    render(<WithExtension />);

    // hover over asset card
    await waitFor(() => {
      const assetCard = screen.getByText("cub.jpg");
      fireEvent.mouseOver(assetCard);
    });

    // click replace button
    await waitFor(() => {
      const replaceButton = screen.getByTestId("asset-card-replace-button")
        .children[0];
      fireEvent.click(replaceButton);
    });

    expect(screen.getByText("Save Image")).toBeInTheDocument();
  });

  test("should auto-select source when replace button is clicked", async () => {
    render(<WithExtension />);

    // hover over asset card
    await waitFor(() => {
      const assetCard = screen.getByText("cub.jpg");
      fireEvent.mouseOver(assetCard);
    });

    // click replace button
    await waitFor(() => {
      const replaceButton = screen.getByTestId("asset-card-replace-button")
        .children[0];
      fireEvent.click(replaceButton);
    });

    await waitFor(
      () => {
        screen.getByTestId("source-select-button-label-assets");
      },
      // had to increase timeout to account for hitting the actual API
      { timeout: 2000 }
    );

    const selectedSource = screen.getByTestId(
      "source-select-button-label-assets"
    );

    expect(selectedSource.innerHTML).toBe("assets");
  }, 11000);

  test("should remove image when delete button is clicked", async () => {
    render(<WithExtension />);

    // hover over asset card
    await waitFor(() => {
      const assetCard = screen.getByText("cub.jpg");

      fireEvent.mouseOver(assetCard);
    });

    // click delete button
    await waitFor(() => {
      const deleteButton = screen.getByTestId("asset-card-delete-button")
        .children[0];
      fireEvent.click(deleteButton);
    });

    expect(document.querySelectorAll("img").length).toBe(0);
  });
});
