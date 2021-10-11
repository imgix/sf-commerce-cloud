import React, { ReactElement } from "react";
import { SearchIconSvg } from "../../icons/SearchIconSvg";
import "../../../styles/Form.css";

interface Props {
  placeholder?: string;
}

export function SearchBar({ placeholder }: Props): ReactElement {
  return (
    <form className="ix-asset-simple-search-content">
      <div className="ix-asset-simple-search-wrapper">
        <div className="ix-asset-simple-search-base">
          <div className="ix-asset-simple-search-base-input">
            <div className="ix-asset-simple-search-icon">
              <SearchIconSvg />
            </div>
            <input
              type="text"
              className="ix-asset-simple-search-base-input-field"
              placeholder={
                placeholder ? placeholder : "Search filename or path"
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
}
