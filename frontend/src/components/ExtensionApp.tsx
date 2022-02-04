import React from "react";
import { IImgixCustomAttribute } from "../../../types";
import "../styles/App.css";
import { AssetBrowserContainer } from "./AssetBrowser/AssetBrowserContainer";
import { Modal } from "./layouts/Modal";
import { ProductPageImages } from "./ProductPageImages";

export type ISidebarAppProps = {
  onChange: (value: string) => void;
  apiKey: string | null;
  data: IImgixCustomAttribute | undefined;
};

export function ExtensionApp({ onChange, apiKey, data }: ISidebarAppProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const images = data?.images || [];
  const disabled = images === undefined || images.length === 0;
  const onOpenBreakoutClick = () => {
    console.log("[imgix] open imgix modal");
    setIsModalOpen(true);
  };

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
            <AssetBrowserContainer apiKey={apiKey} />
          </Modal>
          <ProductPageImages
            onClick={onOpenBreakoutClick}
            images={images}
            disabled={disabled}
          />
        </div>
      </header>
    </div>
  );
}
