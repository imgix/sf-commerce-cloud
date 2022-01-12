import React, { ReactElement } from "react";
import Imgix from "react-imgix";
import { AddSvg } from "./icons/AddSvg";
import styles from "./SidebarApp.module.css";

export interface ProductPageImagesProps {
  images:
    | {
        title: string;
        url: string;
      }[]
    | null;
  disabled: boolean;
}

export const ProductPageImages = ({
  images,
}: ProductPageImagesProps): ReactElement => {
  return (
    <div style={{ width: 500, overflowX: "auto" }}>
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* create an li for each image in data.images */}
        {images?.map((image, index) => (
          <li
            style={{
              margin: 5,
              minWidth: 60,
            }}
            key={index}
          >
            <Imgix
              src={image.url}
              imgixParams={{
                auto: "format",
                fit: "crop",
                crop: "entropy",
              }}
              width={60}
              height={60}
            />
          </li>
        ))}
        <li style={{ margin: 5, minWidth: 120, display: "flex" }}>
          <div className={styles.addImageButton} onClick={() => {}}>
            <div className={styles.addIcon}>
              <AddSvg />
            </div>
            ADD IMAGE
          </div>
        </li>
      </ul>
    </div>
  );
};
