import React, { ReactElement } from "react";
import { AssetT } from "../../types";
import "../../styles/Grid.css";
interface Props {
  assets: AssetT[];
}

export function AssetGrid({ assets }: Props): ReactElement {
  const gridItems = assets.map((asset, idx) => {
    return (
      <div className="ix-grid-item" key={`${asset.filename}-${idx}`}>
        <div className="ix-grid-item-image">
          <img src={asset.url} alt={asset.filename} />
        </div>
        <p className="ix-grid-item-filename">{asset.filename}</p>
      </div>
    );
  });
  return <div className="ix-grid">{gridItems}</div>;
}
