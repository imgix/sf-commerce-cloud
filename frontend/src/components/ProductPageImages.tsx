import React, { ReactElement } from "react";
import { IProductImage } from "../types";
import { FrameButton } from "./buttons/FrameButton/FrameButton";
import { Divider } from "./dividers/Divider";
import { AddSvg } from "./icons";
import { OverflowScrollX } from "./layouts/OverflowScrollX";
import { ProductImageContainer } from "./ProductImage/ProductImageContainer";
import styles from "./ProductPageImages.module.scss";

export interface ProductPageImagesProps {
  disabled: boolean;
  images: IProductImage[] | undefined;
  onClick: () => void;
}

export const ProductPageImages = ({
  disabled,
  images,
  onClick,
}: ProductPageImagesProps): ReactElement => {
  return (
    <OverflowScrollX>
      <div className={styles.addImageButtonContainer}>
        <FrameButton
          frameless
          label="Add Image"
          type="tertiary"
          className={styles.addImageButton}
          icon={<AddSvg />}
        />
      </div>
      <Divider vertical />
      <>
        {/* we have to create a fragment around jsx elements otherwise
        typescript will throw an error */}
        {images?.map((image: IProductImage) => {
          return (
            <ProductImageContainer
              onOpenBreakoutClick={onClick}
              image={{ ...image } as IProductImage}
            />
          );
        })}
      </>
    </OverflowScrollX>
  );
};
