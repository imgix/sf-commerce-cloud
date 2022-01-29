import React from "react";
import "../styles/App.css";
import { IProductImageData } from "../types/";
import { ProductPageImages } from "./ProductPageImages";

export type ISidebarAppProps = {
  onChange: (value: string) => void;
  data: IProductImageData | undefined;
};

export function ExtensionApp({ onChange, data }: ISidebarAppProps) {
  const images = data?.images || [];
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
            images={images}
            disabled={disabled}
          />
        </div>
      </header>
    </div>
  );
}
