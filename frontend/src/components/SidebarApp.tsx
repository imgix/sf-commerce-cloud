import React from "react";
import Imgix from "react-imgix";
// TODO(luis): replace placeholder image
import "../styles/App.css";
import { IImgixCustomAttributeValue } from "../types/imgixSF";
import { AddImageIcon } from "./buttons/AddImageIcon";

export function App({
  handleBreakoutOpen,
  value,
}: {
  handleBreakoutOpen: () => void;
  value: IImgixCustomAttributeValue | undefined;
}) {
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
