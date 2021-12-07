import React, { ReactElement } from "react";
import { SearchBar as _SearchBar } from "../components/forms/search/SearchBar";
import "../styles/App.css";
import "../styles/Grid.css";
interface Props {
  placeholder?: string;
}

export function SearchBar({ placeholder }: Props): ReactElement {
  const handleSubmit = (value: string) => {
    console.log(`handleSubmit:`, value);
  };
  return (
    <div
      style={{ margin: 5, position: "relative" }}
      className="ix-searchbar-container"
    >
      <_SearchBar handleSubmit={handleSubmit} placeholder={placeholder} />
    </div>
  );
}
