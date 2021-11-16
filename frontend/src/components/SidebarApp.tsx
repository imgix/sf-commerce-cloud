import React from "react";
import Imgix from "react-imgix";
// TODO(luis): replace placeholder image
import "../styles/App.css";
import { IBreakoutPayload } from "../types/imgixSF";
import { AddImageIcon } from "./buttons/AddImageIcon";

export function App({
  handleBreakoutOpen,
  value,
}: {
  handleBreakoutOpen: () => void;
  value: IBreakoutPayload;
}) {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Imgix
            src={value.src}
            imgixParams={{
              w: 350,
            }}
          />
          <AddImageIcon handleClick={handleBreakoutOpen} />
        </div>
      </header>
    </div>
  );
}
