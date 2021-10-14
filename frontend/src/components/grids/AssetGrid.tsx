import React, { ReactElement } from "react";
import Imgix from "react-imgix";
import { AssetT, SourceT } from "../../types";
import "../../styles/Grid.css";
interface Props {
  assets: AssetT[];
}

export function AssetGrid({ assets }: Props): ReactElement {
  const gridItems = assets.map((asset, idx) => {
    console.log(asset);

    return (
      <div className="ix-grid-item" key={`${asset.id}-${idx}`}>
        <div className="ix-grid-item-image">
          <Imgix
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
  return <div className="ix-grid">{gridItems}</div>;
}
