import React from "react";
import { App as BreakoutApp } from "../components/BreakoutApp";
import "../styles/App.css";
import "../styles/index.css";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import Modal from "./layouts/Modal";
import { ProductPageImages } from "./ProductPageImages";

export type ISidebarAppProps = {
  onChange: (value: string) => void;
  images: IImgixCustomAttributeValue[] | undefined;
};

export function ExtensionApp({ onChange, images }: ISidebarAppProps) {
  const disabled = images === undefined || images.length === 0;
  const [open, setOpen] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState(null);
  const onModalClose = () => {
    console.log("[imgix] Modal closed");
    setOpen(false);
  };
  const openModal = (data: any) => {
    console.log("[imgix] Modal opened");
    setSelectedAsset(data);
    setOpen(true);
  };

  console.log("[imgix] images: ", images, selectedAsset);

  return (
    <div className="App">
      <header className="App-header">
        <div className="ix-chrome-extension">
          <Modal open={open} onClose={onModalClose} locked={false}>
            <div className="modal-content">
              <BreakoutApp
                apiKey={""}
                onSubmit={(data: IImgixCustomAttributeValue) => {
                  onChange(JSON.stringify(data));
                }}
              />
            </div>
          </Modal>
          <ProductPageImages
            onClick={openModal}
            images={images}
            disabled={disabled}
          />
        </div>
      </header>
    </div>
  );
}
