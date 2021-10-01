import React, { ReactElement } from "react";
import { SearchBar as _SearchBar } from "../components/forms/search/SearchBar";
import "../styles/Grid.css";
interface Props {
  placeholder?: string;
}

export function SearchBar({ placeholder }: Props): ReactElement {
  return (
    <div
      style={{ margin: 5, position: "relative" }}
      className="ix-searchbar-container"
    >
      <_SearchBar placeholder={placeholder} />
    </div>
  );
}
