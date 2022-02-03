import React, { ReactElement } from "react";
import { IImgixCustomAttributeImage } from "../../../../types";
import { ReplaceButton } from "../buttons/ReplaceButton";
import { AssetCard } from "../card/AssetCard";
import { Divider } from "../dividers/Divider";
import { Overlay } from "../layouts/Overlay";
import styles from "./ProductImageContainer.module.scss";

interface Props {
  onOpenBreakoutClick: (id?: string) => void;
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
    <div className={styles.contentWrapper}>
      <div
        className={styles.imageWrapper}
        onClick={() => onOpenBreakoutClick(image.imgix_metadata?.id)}
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
      <Divider vertical />
    </div>
  );
};
