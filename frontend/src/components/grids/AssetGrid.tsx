import React, { ReactElement } from "react";
import Imgix from "react-imgix";
import { ImgixGETAssetsData } from "../../types";
import { LoadingSpinner } from "../LoadingSpinner";
import "../../styles/Grid.css";

interface Props {
  assets: ImgixGETAssetsData;
  domain: string;
  errors: string[];
  loading: boolean;
  placeholder?: string;
  handleAssetGridClick?: (selectedObject: any) => void;
}

// TODO(luis): refactor this component into smaller components
export function AssetGrid({
  assets,
  domain,
  errors,
  loading,
  placeholder, handleAssetGridClick
}: Props): ReactElement {
  // create grid-items
  const gridItems = assets.map((asset, idx) => {
    return (
      <div className="ix-grid-item" key={`${asset.id}-${idx}`}>
        <div className="ix-grid-item-image" onClick={() => {
            if (handleAssetGridClick) {
                handleAssetGridClick({
                    src: asset
                })
            }
        }}>
          <Imgix
            src={"https://" + domain + asset.attributes.origin_path}
            width={340}
            height={340}
            imgixParams={{
              auto: "format",
              fit: "crop",
              crop: "entropy",
            }}
            sizes="(min-width: 480px) calc(12.5vw - 20px)"
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
      <div className="ix-grid-item-placeholder error">
        <div>{message}</div>
      </div>
    );
  }
  // show grid placeholder if no assets
  else if (!assets.length && !loading) {
    return (
      <div className="ix-grid-item-placeholder">
        <div>{placeholder || "Select a source"}</div>
      </div>
    );
  }
  // show loading indicator if loading
  if (loading) {
    return (
      <div className="ix-grid-item-placeholder loading">
        <div>
          <LoadingSpinner loading={loading} />
        </div>
      </div>
    );
  }

  // create the asset grid
  return <div className="ix-grid">{gridItems}</div>;
}
