import React from "react";
import "../styles/App.css";
import { IBreakoutAppOnSubmit } from "../types/breakoutAppPublic";
import styles from "./App.module.scss";
import { AssetBrowserContainer as AssetBrowser } from "./AssetBrowser/AssetBrowserContainer";

interface Props {
  onSubmit: IBreakoutAppOnSubmit;
  apiKey: string | null;
}
export function App({ onSubmit, apiKey }: Props) {
  return (
    <div className={styles.App}>
      <AssetBrowser apiKey={apiKey} onSelectAsset={onSubmit} />
    </div>
  );
}
