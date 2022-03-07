import React from "react";
import "../styles/GlobalReset.css";
import styles from "../styles/ScopedReset.module.scss";
import { IBreakoutAppOnSubmit } from "../types/breakoutAppPublic";
import { AssetBrowserContainer as AssetBrowser } from "./AssetBrowser/AssetBrowserContainer";

interface Props {
  onSubmit: IBreakoutAppOnSubmit;
  apiKey: string | null;
}
export function App({ onSubmit, apiKey }: Props) {
  return (
    <div className={styles.ixReset}>
      <AssetBrowser apiKey={apiKey} onSelectAsset={onSubmit} />
    </div>
  );
}
