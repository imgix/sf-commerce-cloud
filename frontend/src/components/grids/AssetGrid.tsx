import React, { ReactElement } from "react";
import Imgix from "react-imgix";
import "../../styles/Grid.css";
import { ImgixGETAssetsData } from "../../types";
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

// TODO(luis): refactor this component into smaller components
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
      <div
        className={`ix-grid-item ${
          selectedAssetId === asset.id ? "ix-grid-item-selected" : ""
        }`}
        key={`${asset.id}-${idx}`}
        onClick={() => onClick(asset)}
      >
        <div className="ix-grid-item-image">
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
        <p className="ix-grid-item-filename">
          {domain + asset.attributes.origin_path}
        </p>
      </div>
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
