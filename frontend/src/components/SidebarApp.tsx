import React from "react";

import { AddImage } from "./buttons/AddImageIcon";

import "../styles/App.css";

export function App() {
  const handleClick = () => {
    console.log("clicked 'Add Image' button");
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <AddImage handleClick={handleClick} />
        </div>
      </header>
    </div>
  );
}
