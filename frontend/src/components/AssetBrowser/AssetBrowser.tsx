import React, { ReactElement } from "react";
import { AssetGrid } from "../grids/AssetGrid";
import { SourceSelect } from "../buttons/dropdowns/SourceSelect";
import { SearchBar } from "../forms/search/SearchBar";

import { SourceT } from "../../types";

import "../../styles/AssetBrowser.css";

interface Props {
  apiKey: string;
}

export function AssetBrowser({ apiKey }: Props): ReactElement {
  const [sources, setSources] = React.useState<SourceT[]>([]);
  const [assets, setAssets] = React.useState<any[]>([]);

  return (
    <div className="ix-asset-browser">
      <div className="ix-asset-title-bar-container">
        <SourceSelect sources={sources} />
        <SearchBar />
      </div>
      <div className="ix-asset-grid-container">
        <AssetGrid assets={assets} />
      </div>
      <div className="ix-asset-meta-information-container"></div>
    </div>
  );
}
