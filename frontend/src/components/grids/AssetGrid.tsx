import React, { ReactElement } from "react";
import Imgix from "react-imgix";
import { ImgixGETAssetsData } from "../../types";
import "../../styles/Grid.css";
interface Props {
  assets: ImgixGETAssetsData;
  domain: string;
}
// TODO(luis): refactor this component into smaller components
export function AssetGrid({ assets, domain }: Props): ReactElement {
  // create grid-items
  const gridItems = assets.map((asset, idx) => {
    return (
      <div className="ix-grid-item" key={`${asset.id}-${idx}`}>
        <div className="ix-grid-item-image">
          <Imgix
            domain={domain}
            src={asset.attributes.origin_path}
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
        <p className="ix-grid-item-filename">{asset.attributes.origin_path}</p>
      </div>
    );
  });
  // create the asset grid
  return <div className="ix-grid">{gridItems}</div>;
}
