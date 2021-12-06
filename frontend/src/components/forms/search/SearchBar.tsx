import React, { ReactElement } from "react";
import { Button } from "../../buttons/Button";
import { DisabledSvg } from "../../icons/DisabledSvg";
import { SearchIconSvg } from "../../icons/SearchIconSvg";
import styles from "./SearchBar.module.scss";
import { useClickOutside } from "./useClickOutside";
import { useLocalStorage } from "./useLocalStorage";

interface Props {
  placeholder?: string;
  handleSubmit: (value: string) => void;
}

export function SearchBar({ placeholder, handleSubmit }: Props): ReactElement {
  const [query, setQuery] = React.useState("");
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "searchHistory",
    []
  );
  const { visibleRef, isVisible, setIsVisible } = useClickOutside(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.currentTarget.value);
  };

  return (
    <form
      className={styles.searchContent + " " + (isVisible ? styles.open : "")}
      onSubmit={(e) => {
        // Prevent the form from submitting, i.e. reloading the page
        e.preventDefault();
        // Call the handleSubmit function that was passed through props
        handleSubmit(query);
        // Add the query to the search history
        // if the search history is longer than 4 items, remove the first item
        const newSearchHistory = [...searchHistory];
        if (newSearchHistory.length > 2) {
          newSearchHistory.shift();
        }
        // if query is an empty string, don't add it to the search history
        if (query !== "") {
          newSearchHistory.push(query);
        }
        setSearchHistory([...newSearchHistory]);
      }}
    >
      <div ref={visibleRef} className={styles.searchWrapper}>
        <div className={styles.searchBase}>
          <div className={styles.searchBaseInput}>
            <div className={styles.simpleSearchIcon}>
              <SearchIconSvg />
            </div>
            {/* TODO: handle escape key */}
            <input
              type="text"
              className={styles.searchBaseInputField}
              placeholder={
                placeholder
                  ? placeholder
                  : "Search by filename, path, tag, or category"
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
              onClick={() => {
                // let the clickOutside hook know that the search bar is visible
                setIsVisible(true);
              }}
              onFocus={() => {
                setIsVisible(true);
              }}
            />
          </div>
        </div>
        <div
          className={
            styles.searchExpander +
            " " +
            (isVisible ? styles.show : styles.hide)
          }
        >
          <div className={styles.searchButtons}>
            <Button
              className={styles.clear}
              leftIconClassName={styles.clearIcon}
              label={"Clear"}
              leftIcon={<DisabledSvg />}
            />
            <Button
              className={styles.search}
              leftIconClassName={styles.searchIcon}
              label={"Search"}
              leftIcon={<SearchIconSvg />}
            />
          </div>
          <hr></hr>
          <div className={styles.searchBaseSuggestionsList}>
            <p>Recent Searches</p>
            {searchHistory.map((search: string) =>
              // if search is empty, don't render anything
              search.length ? (
                <div
                  className={styles.searchBaseSuggestionsListItem}
                  key={search}
                  onClick={() => {
                    setQuery(search);
                    handleSubmit(search);
                  }}
                >
                  {" "}
                  <div className={styles.searchBaseSuggestionsListItem}>
                    <div className={styles.simpleSearchIcon}>
                      <SearchIconSvg />
                    </div>
                    {search}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
