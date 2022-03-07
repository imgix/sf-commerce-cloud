import React, { ReactElement } from "react";
import { AssetBrowserContainer as _AssetBrowser } from "../components/AssetBrowser/AssetBrowserContainer";

interface Props {
  apiKey: string;
}

export function AssetBrowser({ apiKey, ...otherProps }: Props): ReactElement {
  return (
    <div className="asset-browser-story">
      <_AssetBrowser apiKey={apiKey} {...otherProps} />
    </div>
  );
}
