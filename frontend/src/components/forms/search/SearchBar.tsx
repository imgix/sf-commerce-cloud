import React, { ReactElement } from "react";
import { SearchIconSvg } from "../../icons/SearchIconSvg";
import "../../../styles/Form.css";

interface Props {
  placeholder?: string;
  handleSubmit: (value: string) => void;
}

export function SearchBar({ placeholder, handleSubmit }: Props): ReactElement {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.currentTarget.value);
  };
  return (
    <form
      className="ix-asset-simple-search-content"
      onSubmit={(e) => {
        // Prevent the form from submitting, i.e. reloading the page
        e.preventDefault();
        // Call the handleSubmit function that was passed through props
        handleSubmit(query);
      }}
    >
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
              value={query}
              onChange={(event) => {
                event.preventDefault();
                handleInputChange(event);
              }}
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(query);
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
