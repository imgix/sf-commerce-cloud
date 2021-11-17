import React from "react";
import "../styles/App.css";
import { IBreakoutAppOnSubmit } from "../types/breakoutAppPublic";
import { AssetBrowserContainer as AssetBrowser } from "./AssetBrowser/AssetBrowserContainer";

interface Props {
  onSubmit: IBreakoutAppOnSubmit;
  apiKey: string | null;
}
export function App({ onSubmit, apiKey }: Props) {
  return (
    <div className="App">
      <header className="App-header">
        <AssetBrowser apiKey={apiKey} onSelectAsset={onSubmit} />
      </header>
    </div>
  );
}
