import React, { ReactElement } from "react";
import { AssetGrid as _AssetGrid } from "../components/grids/AssetGrid";
import "../styles/App.css";
import "../styles/Grid.css";
import { ImgixGETAssetsData } from "../types";
interface Props {
  assets: ImgixGETAssetsData;
  domain: string;
}

export function AssetGrid({ assets, domain }: Props): ReactElement {
  return (
    <div className="ix-grid-container">
      <_AssetGrid
        domain={domain}
        assets={assets}
        placeholder={"loading..."}
        errors={[]}
        loading={false}
      />
    </div>
  );
}
