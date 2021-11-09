import React from "react";
import { AssetBrowserContainer as AssetBrowser } from "./AssetBrowser/AssetBrowserContainer";

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AssetBrowser apiKey={"placeholder"} />
      </header>
    </div>
  );
}
