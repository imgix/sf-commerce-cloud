import React, { ReactElement } from "react";
import { IImgixCustomAttributeImage } from "../../../../types";
import { FrameButton } from "../buttons/FrameButton/FrameButton";
import { AssetCard } from "../card/AssetCard";
import { Divider } from "../dividers/Divider";
import { DeleteIcon, RefreshSvg } from "../icons";
import { MetaSvg } from "../icons/MetaSvg";
import { Overlay } from "../layouts/Overlay";
import styles from "./ProductImageContainer.module.scss";

interface Props {
  onClick: (type: "delete" | "replace" | "add" | "edit", id?: string) => void;
  image: IImgixCustomAttributeImage;
}

export const ProductImageContainer = ({
  image,
  onClick,
}: Props): ReactElement => {
  const [hovering, setHovering] = React.useState(false);

  const onMouseEnter = (): void => {
    setHovering(true);
  };

  const onMouseLeave = (): void => {
    setHovering(false);
  };

  return (
    <div className={styles.contentWrapper}>
      <div
        className={styles.imageWrapper}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Overlay rounded visible={hovering}>
          <div className={styles.buttonContainer}>
            <div data-testid="asset-card-delete-button">
              <FrameButton
                className={styles.button}
                color="tertiary"
                icon={<DeleteIcon />}
                onClick={() => onClick("delete", image.imgix_metadata?.id)}
              />
            </div>
            <div data-testid="asset-card-replace-button">
              <FrameButton
                className={styles.button}
                color="tertiary"
                icon={<RefreshSvg />}
                onClick={() => {
                  setHovering(false);
                  onClick("replace", image.imgix_metadata?.id);
                }}
              />
            </div>
            <div data-testid="asset-card-edit-button">
              <FrameButton
                className={styles.button}
                color="tertiary"
                icon={<MetaSvg />}
                onClick={() => {
                  setHovering(false);
                  onClick("edit", image.imgix_metadata?.id);
                }}
              />
            </div>
          </div>
        </Overlay>
        <AssetCard
          asset={image?.imgix_metadata}
          domain={image?.imgix_metadata?.base_url || ""}
        />
      </div>
      <Divider vertical />
    </div>
  );
};
