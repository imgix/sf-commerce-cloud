import React from "react";
import {
  IImgixCustomAttribute,
  IImgixCustomAttributeImage,
} from "../../../types";
import "../styles/App.css";
import { IBreakoutAppData } from "../types/breakoutAppPublic";
import { AssetBrowserContainer } from "./AssetBrowser/AssetBrowserContainer";
import { FrameButton } from "./buttons/FrameButton/FrameButton";
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

  const openModal = () => {
    console.info("[imgix] open imgix modal");
    setIsModalOpen(true);
  };

  const onProductImageClick = (id?: string) => {
    console.log("[imgix] onProductImageClick id:", id);

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

    setSelectedAssetImage(newImage);
  };

  const saveSelectionToDataOnClick = () => {
    if (selectedProductImageId && selectedAssetImage) {
      console.log("[imgix] selectedAssetImage exists, replacing data");
      // for image with matching id, replace the image with the selected asset
      const newImages = productImages.map((image) => {
        if (image.imgix_metadata?.id === selectedProductImageId) {
          return selectedAssetImage;
        }
        return image;
      });
      updateProductImages(newImages || []);
    } else if (selectedAssetImage) {
      console.log("[imgix] asset selected, adding to data");
      const newImages = productImages.concat(selectedAssetImage);
      updateProductImages(newImages || []);
    } else {
      console.log("[imgix] selectedAssetImage does not exist, not adding data");
    }
  };

  const images = productImages || [];
  const disabled = images === undefined || images.length === 0;

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Modal
            locked={false}
            onClose={() => {
              setIsModalOpen(false);
            }}
            open={isModalOpen}
          >
            <AssetBrowserContainer
              apiKey={apiKey}
              onSelectAsset={onSelectAsset}
            />
            <FrameButton label="save" onClick={saveSelectionToDataOnClick} />
          </Modal>
          <ProductPageImages
            onClick={onProductImageClick}
            images={productImages}
            disabled={disabled}
          />
        </div>
      </header>
    </div>
  );
}
