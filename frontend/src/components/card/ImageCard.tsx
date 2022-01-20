import React, { ReactElement } from "react";
import Imgix from "react-imgix";
import { ImgixGETAssetsData } from "../../types";
import styles from "./ImageCard.module.scss";

interface ImageCardProps {
  asset: ImgixGETAssetsData[0];
  domain: string;
  layout?: "grid" | "list";
  placeholder?: string;
  selectedAssetId?: string;
  onClick?: (data: Object) => void;
}

export function ImageCard({
  asset,
  domain,
  layout,
  placeholder,
  selectedAssetId,
  onClick,
}: ImageCardProps): ReactElement {
  // Strip filename from asset.attributes.origin_path
  const filename =
    asset.attributes.origin_path.split("/").pop()?.split("?")[0] || "";
  const isImage = filename.match(
    /\.(avif|gif|jp2|jpg|json|jxr|pjpg|png|png8|png32|webp|blurhash)$/
  );

  const containerStyles = [
    styles.container,
    layout === "list" ? styles.list : styles.grid,
    !isImage ? styles.disabled : "",
  ].join(" ");

  return (
    <div
      className={
        containerStyles +
        ` ${selectedAssetId === asset.id ? styles.selected : ""}`
      }
      onClick={() => onClick && onClick(asset)}
    >
      {isImage ? (
        <div className={styles.image}>
          <Imgix
            src={"https://" + domain + asset.attributes.origin_path}
            imgixParams={{
              auto: "format",
              fit: "crop",
              crop: "entropy",
            }}
            /* This sizes attribute is a monster and sets the size of the image
             * correctly, handling both the SF breakpoints and the design
             * breakpoints
             * The SF modal has a breakpoint at 768px (48rem), below which the
             * modal has a margin around it of 32px, and above which it has a
             * margin of 5% each side.
             * In these calculates, the format is:
             * calc((100vw - SFmargin - modalMargin - betweenColumnMarginSum)/numColumns)
             * */
            sizes="(max-width: 500px) calc((100vw - 64px - 32px - 16px)/2),
            (max-width: 700px) calc((100vw - 64px - 32px - 32px)/3),
            (max-width: 768px) calc((100vw - 64px - 32px - 48px)/4),
            (max-width: 820px) calc((100vw - 10vw - 32px - 48px)/4),
            (max-width: 960px) calc((100vw - 10vw - 32px - 80px)/6),
            calc((100vw - 10vw - 32px - 96px)/7)"
          />
        </div>
      ) : (
        <div className={styles.placeholder}>
          <img src={placeholder} />
        </div>
      )}
      <p className={styles.filename}>{domain + filename}</p>
    </div>
  );
}
