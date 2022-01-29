import React, { ReactElement } from "react";
import "../../styles/Grid.css";
import { ImgixGETAssetsData } from "../../types";
import { AssetCard } from "../card/AssetCard";
import { Spinner } from "../Spinner/Spinner";
import styles from "./AssetGrid.module.scss";

export type IAssetGridClickCallback = (data: {
  src: ImgixGETAssetsData[0];
}) => void;

interface Props {
  assets: ImgixGETAssetsData;
  domain: string;
  errors: string[];
  loading: boolean;
  placeholder?: string;
  handleAssetGridClick?: IAssetGridClickCallback;
}

export function AssetGrid({
  assets,
  domain,
  errors,
  loading,
  placeholder,
  handleAssetGridClick,
}: Props): ReactElement {
  // create grid-items
  const [selectedAssetId, setSelectedAssetId] = React.useState<string>("");
  const onClick = (asset: ImgixGETAssetsData[0]) => {
    setSelectedAssetId(asset.id);
    if (handleAssetGridClick) {
      handleAssetGridClick({ src: asset });
    }
  };
  const gridItems = assets.map((asset, idx) => {
    return (
      <AssetCard
        key={idx}
        asset={asset}
        domain={domain}
        selectedAssetId={selectedAssetId}
        layout="grid"
        onClick={onClick}
      />
    );
  });
  // show grid error message if error
  if (errors.length > 0) {
    const message = errors.pop();
    return (
      <div className={styles.gridItemPlaceholder + " " + styles.error}>
        <div>{message}</div>
      </div>
    );
  }
  // show grid placeholder if no assets
  else if (!assets.length && !loading) {
    return (
      <div className={styles.gridItemPlaceholder}>
        <div>{placeholder || "Select a source"}</div>
      </div>
    );
  }
  // show loading indicator if loading
  if (loading) {
    return (
      <div className={styles.gridItemPlaceholder}>
        <div>
          <Spinner label="Loading assets..." />
        </div>
      </div>
    );
  }

  // create the asset grid
  return <div className={"ix-grid " + styles.gridContainer}>{gridItems}</div>;
}
