import React from "react";
import { AssetBrowserContainer as AssetBrowser } from "./AssetBrowser/AssetBrowserContainer";

export function App({ apiKey }: { apiKey: string | null }) {
  return (
    <div className="App">
      <header className="App-header">
        <AssetBrowser apiKey={apiKey} />
      </header>
    </div>
  );
}
