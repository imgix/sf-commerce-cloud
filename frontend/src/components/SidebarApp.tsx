import React from "react";
import Imgix from "react-imgix";
import "../styles/App.css";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import { AddImageIcon } from "./buttons/AddImageIcon";
import { AddSvg } from "./icons/AddSvg";
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
              <Imgix
                src={value.src}
                width={344}
                height={160}
                imgixParams={{
                  fit: "crop",
                }}
              />
            ) : (
              <div className={styles.addImageButton}>
                <div className={styles.addIcon}>
                  <AddSvg />
                </div>
                ADD IMAGE
              </div>
            )}
          </div>
          <AddImageIcon handleClick={handleBreakoutOpen} />
          <div className={styles.hr} />
        </div>
      </header>
    </div>
  );
}
