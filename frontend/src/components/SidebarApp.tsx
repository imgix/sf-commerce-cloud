import React from "react";
import Imgix from "react-imgix";
// TODO(luis): replace placeholder image
import "../styles/App.css";
import { AddImageIcon } from "./buttons/AddImageIcon";

export function App({
  handleBreakoutOpen,
}: {
  handleBreakoutOpen: () => void;
}) {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Imgix
            src="https://assets.imgix.net/amsterdam.jpg"
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
