import React, { ReactElement } from "react";
import { IImgixCustomAttributeImage } from "../../../../types";
import { FrameButton } from "../buttons/FrameButton/FrameButton";
import { ReplaceButton } from "../buttons/ReplaceButton";
import { AssetCard } from "../card/AssetCard";
import { Divider } from "../dividers/Divider";
import { Overlay } from "../layouts/Overlay";
import styles from "./ProductImageContainer.module.scss";

interface Props {
  onOpenBreakoutClick: () => void;
  image: IImgixCustomAttributeImage;
}

export const ProductImageContainer = ({
  image,
  onOpenBreakoutClick,
}: Props): ReactElement => {
  const [hovering, setHovering] = React.useState(false);

  const onMouseEnter = (): void => {
    setHovering(true);
  };

  const onMouseLeave = (): void => {
    setHovering(false);
  };

  return (
    <div style={{ minWidth: 342, display: "flex" }}>
      <div
        className={styles.imageWrapper}
        onClick={onOpenBreakoutClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Overlay rounded visible={hovering}>
          <ReplaceButton label="REPLACE" />
        </Overlay>
        <AssetCard
          asset={image?.imgix_metadata}
          domain={image?.imgix_metadata?.base_url || ""}
        />
      </div>
      <div className={styles.assetButtonsContainer}>
        <div className={styles.assetButtons}>
          <FrameButton size="small" color="primary" />
          <p>Large</p>
        </div>
        <div className={styles.assetButtons}>
          <FrameButton size="small" color="primary" />
          <p>Medium</p>
        </div>
        <div className={styles.assetButtons}>
          <FrameButton size="small" color="primary" />
          <p>Small</p>
        </div>
      </div>
      <Divider vertical />
    </div>
  );
};
