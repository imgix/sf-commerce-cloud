import React, { ReactElement } from "react";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import { AddIButton } from "./buttons/AddButton";
import { OverflowScrollX } from "./layouts/OverflowScrollX";
import { ProductImageContainer } from "./ProductImage/ProductImageContainer";

export interface ProductPageImagesProps {
  disabled: boolean;
  images: IImgixCustomAttributeValue[] | null;
  onClick: () => void;
}

export const ProductPageImages = ({
  disabled,
  images,
  onClick,
}: ProductPageImagesProps): ReactElement => {
  return (
    <OverflowScrollX>
      <>
        {/* we have to create a fragment around jsx elements otherwise
        typescript will throw an error */}
        {images?.map((image: IImgixCustomAttributeValue) => {
          return (
            <ProductImageContainer
              onOpenBreakoutClick={onClick}
              value={{ ...image } as IImgixCustomAttributeValue}
            />
          );
        })}
      </>
      <div style={{ margin: 5, minWidth: 120, display: "flex" }}>
        <AddIButton
          disabled={disabled}
          label="ADD IMAGE"
          onOpenBreakoutClick={onClick}
        />
      </div>
    </OverflowScrollX>
  );
};
