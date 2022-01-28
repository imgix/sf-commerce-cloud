import React, { ReactElement } from "react";
import { ImgixGETAssetsData } from "../../types";
import { AssetCardImage } from "../image/AssetCardImage";
import styles from "./AssetCard.module.scss";

interface AssetCardProps {
  asset: ImgixGETAssetsData[0];
  domain: string;
  height?: string;
  layout?: "grid" | "list";
  noFilepath?: boolean;
  placeholder?: string;
  selectedAssetId?: string;
  onClick?: (data: Object) => void;
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
    asset.attributes.origin_path.split("/").pop()?.split("?")[0] || "";
  const isImage = filename.match(
    /\.(avif|gif|jp2|jpg|jpeg|json|jxr|pjpg|png|png8|png32|webp|blurhash|svg|ai)$/
  );

  const containerStyles = [
    styles.container,
    layout === "list" ? styles.list : styles.grid,
    !isImage ? styles.disabled : "",
    selectedAssetId === asset.id ? styles.selected : "",
    noFilepath && styles["h-200"],
  ].join(" ");

  return (
    <div className={containerStyles} onClick={() => onClick && onClick(asset)}>
      {isImage ? (
        <div style={{ height }} className={styles.image}>
          <AssetCardImage asset={asset} domain={domain} />
        </div>
      ) : (
        <div style={{ height }} className={styles.placeholder}>
          <img src={placeholder} />
        </div>
      )}
      {noFilepath ? null : <p className={styles.filename}>{filename}</p>}
    </div>
  );
}
