import React from "react";
import Imgix from "react-imgix";
import "../styles/App.css";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import { AddImageIcon } from "./buttons/AddImageIcon";

export type ISidebarAppProps = {
  handleBreakoutOpen: () => void;
  value: IImgixCustomAttributeValue | undefined;
};

export function App({ handleBreakoutOpen, value }: ISidebarAppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {value && (
            <Imgix
              src={value.src}
              imgixParams={{
                w: 350,
              }}
            />
          )}
          <AddImageIcon handleClick={handleBreakoutOpen} />
        </div>
      </header>
    </div>
  );
}
