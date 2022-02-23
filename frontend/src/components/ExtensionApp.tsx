import React from "react";
import {
  IImgixCustomAttribute,
  IImgixCustomAttributeImage,
} from "../../../types";
import reset from "../styles/ScopedReset.module.scss";
import { IBreakoutAppData } from "../types/breakoutAppPublic";
import ActionBar from "./ActionBar/ActionBar";
import { AssetBrowserContainer } from "./AssetBrowser/AssetBrowserContainer";
import styles from "./ExtensionApp.module.scss";
import { AttributeFormContainer } from "./forms/attributes/AttributeFormContainer";
import { Modal } from "./layouts/Modal";
import { ProductPageImages } from "./ProductPageImages";

export type ISidebarAppProps = {
  onChange: (data: IImgixCustomAttribute) => void;
  apiKey: string | null;
  data: IImgixCustomAttribute | undefined;
};

export function ExtensionApp({ onChange, apiKey, data }: ISidebarAppProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProductImageId, setSelectedProductImageId] = React.useState(
    ""
  );
  const [selectedAssetImage, setSelectedAssetImage] = React.useState<
    IImgixCustomAttributeImage | undefined
  >(undefined);
  const [productImages, setProductImages] = React.useState<
    IImgixCustomAttributeImage[]
  >([]);
  const [isAttributeEditorOpen, setIsAttributeEditorOpen] = React.useState(
    false
  );
  const [locked, setLocked] = React.useState(false);

  React.useEffect(() => {
    setLocked(
      document.querySelector(".table_detail_link")?.textContent === "Lock"
    );
  }, []);

  React.useEffect(() => {
    if (data) {
      // We store the products images in a local state
      // so we can use it in the ProductPageImages component
      // to accurately display the state of the product images
      // json as it changes.
      setProductImages(data.images || []);
    }
  }, [data]);

  const updateProductImages = (
    newProductImages: IImgixCustomAttributeImage[]
  ) => {
    setProductImages(newProductImages);
    onChange({
      images: newProductImages,
    });
  };

  const closeAttributeEditor = () => {
    setIsAttributeEditorOpen(false);
  };

  const openModal = (type: "assets" | "attributes" = "assets") => {
    console.info("[imgix] open imgix modal");
    if (type === "assets") {
      setIsModalOpen(true);
    } else if (type === "attributes") {
      setIsAttributeEditorOpen(true);
    }
  };

  const closeModal = (type: "assets" | "attributes" = "assets") => {
    console.info("[imgix] close imgix modal");
    if (type === "assets") {
      setIsModalOpen(false);
    } else if (type === "attributes") {
      closeAttributeEditor();
    }
  };

  const closeModalAndResetSelectedAssetImage = () => {
    setSelectedAssetImage(undefined);
    closeModal();
  };

  const onProductImageClick = (
    type: "delete" | "replace" | "add" | "edit",
    id?: string
  ) => {
    console.log(`[imgix] onProductImageClick - id: ${id} type: ${type}`);

    // if type is "delete"
    if (type === "delete") {
      // remove the image from the productImages array
      const newProductImages = productImages.filter(
        (image) => image.imgix_metadata?.id !== id
      );
      updateProductImages(newProductImages);
      return;
    } else if (type === "edit" && id) {
      // open the modal to edit the image
      setSelectedProductImageId(id);
      openModal("attributes");
      return;
    }

    setSelectedProductImageId(id || "");
    openModal();
  };

  const onSelectAsset = (assetData: IBreakoutAppData) => {
    const { src, imgix_metadata: metadata } = { ...assetData };

    const newImage = {
      src,
      imgix_metadata: metadata,
      // SFCC requires all images have a alt/title attributes
      title: metadata.attributes.name || metadata.attributes.origin_path,
      alt: metadata.attributes.name || metadata.attributes.origin_path,
    };
    // If selected image already in data, set selectedAssetImage to undefined.
    // This will disable the add-image button.
    if (
      productImages.find(
        (image) => image.imgix_metadata?.id === newImage.imgix_metadata?.id
      )
    ) {
      setSelectedAssetImage(undefined);
    } else {
      setSelectedAssetImage(newImage);
    }
  };

  const saveSelectionToDataOnClick = () => {
    if (selectedProductImageId && selectedAssetImage) {
      console.log("[imgix] replacing product image");
      // replace product image with selected asset image
      const newImages = productImages.map((image) => {
        if (image.imgix_metadata?.id === selectedProductImageId) {
          return selectedAssetImage;
        }
        return image;
      });
      updateProductImages(newImages || []);
    } else if (selectedAssetImage) {
      // add product image to data
      console.log("[imgix] adding asset to product images");
      const newImages = [...productImages, selectedAssetImage];
      updateProductImages(newImages);
    }
    closeModalAndResetSelectedAssetImage();
  };

  const images = productImages || [];
  const disabled = images === undefined || images.length === 0 || locked;
  const selectedSourceId = selectedProductImageId.split("/")[0];
  const selectedProductImage = images.find(
    (image) => image.imgix_metadata?.id === selectedProductImageId
  );

  const setProductImageAttributes = (attributes: {
    alt: string;
    title: string;
  }) => {
    if (selectedProductImage) {
      const newImages = productImages.map((image) => {
        if (image.imgix_metadata?.id === selectedProductImageId) {
          return {
            ...image,
            alt: attributes.alt,
            title: attributes.title,
          };
        } else {
          return image;
        }
      });
      updateProductImages(newImages);
      closeAttributeEditor();
    }
  };

  return (
    <div
      className={`${styles.fontSizeOverride} ${styles.boxSizingOverride} ${reset.ixReset}`}
    >
      {/* AssetManager Modal */}
      <Modal
        locked={false}
        onClose={() => {
          setIsModalOpen(false);
        }}
        open={isModalOpen}
      >
        <div
          className={`${styles.fontSizeOverride} ${styles.boxSizingOverride}`}
        >
          <AssetBrowserContainer
            apiKey={apiKey}
            defaultSourceId={selectedSourceId}
            onSelectAsset={onSelectAsset}
          />
          <ActionBar
            disabled={selectedAssetImage === undefined}
            onSave={saveSelectionToDataOnClick}
            onCancel={closeModalAndResetSelectedAssetImage}
          />
        </div>
      </Modal>
      {/* AttributeEditor Modal */}
      <Modal
        locked={true}
        onClose={closeAttributeEditor}
        open={isAttributeEditorOpen}
      >
        <div
          className={`${styles.fontSizeOverride} ${styles.boxSizingOverride}`}
        >
          <AttributeFormContainer
            asset={selectedProductImage}
            onSubmit={setProductImageAttributes}
            onCancel={closeAttributeEditor}
          />
        </div>
      </Modal>
      <div
        className={`${styles.fontSizeOverride} ${styles.boxSizingOverride} ${styles.productPageImagesContainer}`}
      >
        <ProductPageImages
          onClick={onProductImageClick}
          images={productImages}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
