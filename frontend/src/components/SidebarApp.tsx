import React from "react";
import Imgix from "react-imgix";
import "../styles/App.css";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import { AddSvg } from "./icons/AddSvg";
import { RefreshSvg } from "./icons/RefreshSvg";
import styles from "./SidebarApp.module.css";

export type ISidebarAppProps = {
  handleBreakoutOpen: () => void;
  value: IImgixCustomAttributeValue | undefined;
};

export function App({ handleBreakoutOpen, value }: ISidebarAppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className={styles.imageWrapper}>
            {value ? (
              <>
                <div className={styles.replaceImageOverlay}>
                  <div
                    className={styles.replaceImageOverlayButton}
                    onClick={handleBreakoutOpen}
                  >
                    <div className={styles.replaceImageIcon}>
                      <RefreshSvg />
                    </div>
                    REPLACE
                  </div>
                </div>
                <Imgix
                  src={value.src}
                  width={344}
                  height={215}
                  imgixParams={{
                    fit: "crop",
                  }}
                />
              </>
            ) : (
              <div
                className={styles.addImageButton}
                onClick={handleBreakoutOpen}
              >
                <div className={styles.addIcon}>
                  <AddSvg />
                </div>
                ADD IMAGE
              </div>
            )}
          </div>
          <div className={styles.hr} />
        </div>
      </header>
    </div>
  );
}
