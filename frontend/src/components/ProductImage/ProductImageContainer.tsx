import React, { ReactElement } from "react";
import Imgix from "react-imgix";
import { IImgixCustomAttributeValue } from "../../types/imgixSF";
import { ReplaceButton } from "../buttons/ReplaceButton";
import { Overlay } from "../layouts/Overlay";
import styles from "./ProductImageContainer.module.scss";

interface Props {
  onOpenBreakoutClick: (data: any) => void;
  value: IImgixCustomAttributeValue;
}

export const ProductImageContainer = ({
  value,
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
    <div
      className={styles.imageWrapper}
      onClick={() => onOpenBreakoutClick(value)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Overlay visible={hovering}>
        <ReplaceButton />
      </Overlay>
      <Imgix
        height={60}
        imgixParams={{ fit: "crop" }}
        src={value.src}
        width={60}
      />
    </div>
  );
};
