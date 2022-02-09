import React, { ReactElement } from "react";
import { IImgixCustomAttributeImage } from "../../../types";
import { FrameButton } from "./buttons/FrameButton/FrameButton";
import { Divider } from "./dividers/Divider";
import { AddSvg } from "./icons";
import { OverflowScrollX } from "./layouts/OverflowScrollX";
import { ProductImageContainer } from "./ProductImage/ProductImageContainer";
import styles from "./ProductPageImages.module.scss";

export interface ProductPageImagesProps {
  disabled: boolean;
  images: IImgixCustomAttributeImage[] | undefined;
  onClick: (type: "delete" | "replace" | "add", id?: string) => void;
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
          color="tertiary"
          className={styles.addImageButton}
          icon={<AddSvg />}
          onClick={(e) => {
            // prevent form submission
            e.preventDefault();
            onClick("add");
          }}
        />
      </div>
      <Divider vertical />
      <>
        {/* we have to create a fragment around jsx elements otherwise
        typescript will throw an error */}
        {images?.map((image: IImgixCustomAttributeImage) => {
          return (
            <ProductImageContainer onClick={onClick} image={{ ...image }} />
          );
        })}
      </>
    </OverflowScrollX>
  );
};
