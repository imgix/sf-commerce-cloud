import React from "react";
import Imgix from "react-imgix";
import "../styles/App.css";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import { AddSvg } from "./icons/AddSvg";
import { RefreshSvg } from "./icons/RefreshSvg";
import { TrashcanSvg } from "./icons/TrashcanSvg";
import styles from "./SidebarApp.module.scss";

export type ISidebarAppProps = {
  onOpenBreakoutClick: () => void;
  onClear: () => void;
  disabled: boolean;
  value: IImgixCustomAttributeValue | undefined;
};

export function App({
  onOpenBreakoutClick,
  onClear,
  disabled,
  value,
}: ISidebarAppProps) {
  if (disabled) {
    // return a placeholder telling the user to enable the component
    return (
      <div className={styles.disabled}>
        <div className={`${styles.imageWrapper} ${styles.disabled}`}></div>
        <div className={styles.imageCaption}>
          <span className={styles.imageCaptionText}>
            imgix integration disabled. <br />
          </span>
        </div>
        <div className={styles.imageCaption}>
          <span className={styles.imageCaptionText}>
            <span className={styles.imageCaptionText}>
              To re-enable, go to custom preferences and <br />
              set `imgixEnablePageDesigner` to `true`.
            </span>
          </span>
        </div>
        <div className={styles.hr} />
      </div>
    );
  }
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
