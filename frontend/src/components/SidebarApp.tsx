import React from "react";

import { AddImageIcon } from "./buttons/AddImageIcon";
// TODO(luis): replace placeholder image
import imageSrc from "../images/andreas-gucklhorn-unsplash.jpg";
import "../styles/App.css";

export function App() {
  const handleClick = () => {
    console.log("clicked 'Add Image' button");
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <AddImageIcon handleClick={handleClick} imageSrc={imageSrc} />
        </div>
      </header>
    </div>
  );
}
