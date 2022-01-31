import React, { ReactElement } from "react";
import { IImgixMetadata, ImgixGETAssetsData } from "../../types";
import { AssetCardImage } from "../image/AssetCardImage";
import styles from "./AssetCard.module.scss";

interface AssetCardProps {
  asset: ImgixGETAssetsData[0] | IImgixMetadata | undefined;
  domain: string;
  height?: string;
  layout?: "grid" | "list";
  noFilepath?: boolean;
  placeholder?: string;
  selectedAssetId?: string;
  onClick?: (data: ImgixGETAssetsData[0] | IImgixMetadata) => void;
}

export function AssetCard({
  asset,
  domain,
  height,
  layout,
  noFilepath,
  placeholder,
  selectedAssetId,
  onClick,
}: AssetCardProps): ReactElement {
  // Strip filename from asset.attributes.origin_path
  const filename =
    asset?.attributes.origin_path.split("/").pop()?.split("?")[0] || "";
  const isImage = filename.match(
    /\.(avif|gif|jp2|jpg|jpeg|json|jxr|pjpg|png|png8|png32|webp|blurhash|svg|ai)$/
  );

  const containerStyles = [
    styles.container,
    layout === "list" ? styles.list : styles.grid,
    !isImage ? styles.disabled : "",
    selectedAssetId === asset?.id ? styles.selected : "",
    noFilepath ? styles["h-200"] : "",
  ].join(" ");

  return (
    <div
      className={containerStyles}
      onClick={() => onClick && asset && onClick(asset)}
    >
      {isImage ? (
        <div style={{ height }} className={styles.image}>
          <AssetCardImage asset={asset} domain={domain} />
        </div>
      ) : (
        <div style={{ height }} className={styles.placeholder}>
          <img alt="" src={placeholder} />
        </div>
      )}
      {noFilepath ? null : <p className={styles.filename}>{filename}</p>}
    </div>
  );
}
