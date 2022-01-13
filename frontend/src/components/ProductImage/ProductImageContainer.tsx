import React, { ReactElement } from "react";
import Imgix from "react-imgix";
import { IImgixCustomAttributeValue } from "../../types/imgixSF";
import { ReplaceButton } from "../buttons/ReplaceButton";
import { Overlay } from "../layouts/Overlay";
import styles from "../SidebarApp.module.css";

interface Props {
  onOpenBreakoutClick: () => void;
  value: IImgixCustomAttributeValue;
  width?: number;
  height?: number;
  buttonLabel?: string;
  imgixParams?: any;
}

export const ProductImageContainer = ({
  value,
  onOpenBreakoutClick,
  width = 344,
  height = 215,
  buttonLabel,
  imgixParams = {
    fit: "crop",
  },
}: Props): ReactElement => {
  return (
    <div onClick={onOpenBreakoutClick}>
      <div style={{ width, height }} className={styles.imageWrapper}>
        <>
          <Overlay>
            <ReplaceButton label={buttonLabel} />
          </Overlay>
          <Imgix
            src={value.src}
            width={width}
            height={height}
            imgixParams={imgixParams}
          />
        </>
      </div>
    </div>
  );
};
