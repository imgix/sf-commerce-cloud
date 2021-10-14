import React, { ReactElement } from "react";
import { AssetBrowser as _AssetBrowser } from "../components/AssetBrowser/AssetBrowser";

interface Props {
  apiKey: string;
}

export function AssetBrowser({ apiKey }: Props): ReactElement {
  return (
    <div className="asset-browser-story">
      <_AssetBrowser apiKey={apiKey} />
    </div>
  );
}
