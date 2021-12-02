import React, { ReactElement } from "react";
import { SearchIconSvg } from "../../icons/SearchIconSvg";
import { useClickOutside } from "./useClickOutside";
import { useLocalStorage } from "./useLocalStorage";
import { useFocus } from "./useFocus";
import styles from "./SearchBar.module.scss";

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
  const { visibleRef, setIsVisible } = useClickOutside(false);
  const { focusRef, isFocused } = useFocus(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.currentTarget.value);
  };

  return (
    <form
      className={styles.searchContent}
      onSubmit={(e) => {
        // Prevent the form from submitting, i.e. reloading the page
        e.preventDefault();
        // Call the handleSubmit function that was passed through props
        handleSubmit(query);
        // Add the query to the search history
        setSearchHistory([...searchHistory, query]);
      }}
    >
      <div ref={visibleRef} className={styles.searchWrapper}>
        <div className={styles.searchBase}>
          <div className={styles.searchBaseInput}>
            <div className={styles.simpleSearchIcon}>
              <SearchIconSvg />
            </div>
            <input
              ref={focusRef}
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
                // TODO(luis): Remove this. This is a hack to prevent the form
                // from submitting
                event.preventDefault();
                handleSubmit(query);
              }}
              onClick={() => {
                // let the clickOutside hook know that the search bar is visible
                setIsVisible(true);
              }}
            />
          </div>
        </div>
        <div className={isFocused ? styles.show : styles.hide}>
          <div className={styles.searchBaseSuggestionsList}>
            <hr></hr>
            <p>Recent Searches</p>
            {searchHistory.map((search: string) => (
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
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
