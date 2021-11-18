import React from "react";
import Imgix from "react-imgix";
import "../styles/App.css";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import { AddSvg } from "./icons/AddSvg";
import { RefreshSvg } from "./icons/RefreshSvg";
import { TrashcanSvg } from "./icons/TrashcanSvg";
import styles from "./SidebarApp.module.css";

export type ISidebarAppProps = {
  onOpenBreakoutClick: () => void;
  onClear: () => void;
  value: IImgixCustomAttributeValue | undefined;
};

export function App({ onOpenBreakoutClick, onClear, value }: ISidebarAppProps) {
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
                    onClick={onOpenBreakoutClick}
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
                onClick={onOpenBreakoutClick}
              >
                <div className={styles.addIcon}>
                  <AddSvg />
                </div>
                ADD IMAGE
              </div>
            )}
          </div>
          <div className={styles.imageCaption}>
            <span className={styles.imageCaptionText}>
              {value ? value.src : "Add an imgix Image"}
            </span>
            <div className={styles.removeImageButton} onClick={onClear}>
              <div className={styles.removeImageIcon}>
                <TrashcanSvg />
              </div>
            </div>
          </div>
          <div className={styles.hr} />
        </div>
      </header>
    </div>
  );
}
