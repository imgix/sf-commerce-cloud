import React from "react";
import "../styles/App.css";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import { ProductPageImages } from "./ProductPageImages";

export type ISidebarAppProps = {
  onChange: (value: string) => void;
  onClear: () => void;
  images: IImgixCustomAttributeValue[] | undefined;
};

export function ExtensionApp({ onChange, onClear, images }: ISidebarAppProps) {
  const disabled = images === undefined || images.length === 0;
  const onOpenBreakoutClick = () => {
    console.log("[imgix] onOpenBreakoutClick");
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ProductPageImages
            onClick={onOpenBreakoutClick}
            // TODO: add an `onClear` handler
            images={images}
            disabled={disabled}
          />
        </div>
      </header>
    </div>
  );
}
