import React, { ReactElement } from "react";
import { useClickOutside } from "../../../common/hooks/useClickOutside";
import { useLocalStorage } from "../../../common/hooks/useLocalStorage";
import { Button } from "../../buttons/Button";
import { DisabledSvg } from "../../icons/DisabledSvg";
import { SearchIconSvg } from "../../icons/SearchIconSvg";
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
  const { visibleRef, isVisible, setIsVisible } = useClickOutside(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.currentTarget.value);
  };

  const updateSearchHistory = (searchQuery: string) => {
    // Add the query to the search history
    // if the search history is longer than 4 items, remove the first item
    const newSearchHistory = [...searchHistory];
    if (newSearchHistory.length > 2) {
      newSearchHistory.shift();
    }
    // if query is an empty string, don't add it to the search history
    if (searchQuery !== "") {
      newSearchHistory.push(searchQuery);
    }
    setSearchHistory([...newSearchHistory]);
  };

  const handleSearchSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    suggestedSearch?: string
  ) => {
    e.preventDefault();
    const searchTerm = suggestedSearch || query;
    handleSubmit(searchTerm);
    updateSearchHistory(searchTerm);
    setQuery("");
    setIsVisible(false);
  };

  const handleInputFocus = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsVisible(true);
  };

  const handleInputClear = () => {
    setIsVisible(false);
    setQuery("");
  };

  const inputPlaceholder =
    placeholder || "Search by filename, path, tag, or category";

  return (
    <form
      className={styles.searchContent + " " + (isVisible ? styles.open : "")}
      onSubmit={handleSearchSubmit}
    >
      <div ref={visibleRef} className={styles.searchWrapper}>
        <div className={styles.searchBase}>
          <div className={styles.searchBaseInput}>
            <div className={styles.simpleSearchIcon}>
              <SearchIconSvg />
            </div>
            <input
              type="text"
              className={styles.searchBaseInputField}
              placeholder={inputPlaceholder}
              value={query}
              onChange={handleInputChange}
              onClick={handleInputFocus}
              onFocus={handleInputFocus}
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
              onClick={handleInputClear}
            />
            <Button
              className={styles.search}
              leftIconClassName={styles.searchIcon}
              label={"Search"}
              leftIcon={<SearchIconSvg />}
              onClick={handleSearchSubmit}
            />
          </div>
          <hr></hr>
          <div className={styles.searchBaseSuggestionsList}>
            <p>Recent Searches</p>
            {searchHistory.map((suggestion: string, idx: number) =>
              // if search input is not in focus, don't render anything
              // if search is empty, don't render anything
              isVisible && suggestion.length ? (
                <div
                  className={styles.searchBaseSuggestionsListItem}
                  key={suggestion + idx}
                  onClick={(e) => handleSearchSubmit(e, suggestion)}
                >
                  <div className={styles.searchBaseSuggestionsListItem}>
                    <div className={styles.simpleSearchIcon}>
                      <SearchIconSvg />
                    </div>
                    {suggestion}
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
