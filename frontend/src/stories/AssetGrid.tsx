import React, { ReactElement } from "react";
import { AssetGrid as AssetGridComponent } from "../components/grids/AssetGrid";
import "../styles/App.css";
import "../styles/Grid.css";
import { ImgixGETAssetsData } from "../types";
interface Props {
  assets: ImgixGETAssetsData;
  domain: string;
  loading?: boolean;
}

export function AssetGrid({ assets, domain, loading }: Props): ReactElement {
  return (
    <div className="ix-grid-container">
      <AssetGridComponent
        domain={domain}
        assets={assets}
        placeholder={"loading..."}
        errors={[]}
        loading={!!loading}
      />
    </div>
  );
}
