import React, { ReactElement } from "react";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import { AddIButton } from "./buttons/AddButton";
import { ProductImageContainer } from "./ProductImage/ProductImageContainer";

export interface ProductPageImagesProps {
  images: IImgixCustomAttributeValue[] | null;
  disabled: boolean;
  onClick: () => void;
}

export const ProductPageImages = ({
  images,
  disabled,
  onClick,
}: ProductPageImagesProps): ReactElement => {
  return (
    <div style={{ width: 500, overflowX: "auto" }}>
      <ul style={{ display: "flex", flexDirection: "row" }}>
        {/* create an li for each image in data.images */}
        {images?.map((image, index) => (
          <li style={{ margin: 5, minWidth: 60 }} key={index}>
            <ProductImageContainer
              value={{ src: image.src } as IImgixCustomAttributeValue}
              onOpenBreakoutClick={onClick}
              width={60}
              height={60}
            />
          </li>
        ))}
        <li style={{ margin: 5, minWidth: 120, display: "flex" }}>
          <AddIButton
            onOpenBreakoutClick={onClick}
            disabled={disabled}
            label="ADD IMAGE"
          />
        </li>
      </ul>
    </div>
  );
};
