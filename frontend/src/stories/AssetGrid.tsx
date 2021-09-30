import React, { ReactElement } from "react";
import { AssetGrid as _AssetGrid } from "../components/grids/AssetGrid";
import "../styles/Grid.css";
interface Props {
  assets: [];
}

export function AssetGrid({ assets }: Props): ReactElement {
  return (
    <div className="ix-grid-container">
      <_AssetGrid assets={assets} />
    </div>
  );
}
