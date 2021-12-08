import { useEffect, useState } from "react";

export const useListSelectionBehavior = <Item,>({
  /**
   * Used to disable this behavior for UI items that are only visible
   * occasionally, e.g. dropdowns
   */
  active = true,
  /**
   * The items to navigate through
   */
  items,
  /**
   * Will be called when the current item should be confirmed, e.g. after an Enter key press
   */
  onSelectCurrentItem,
}: {
  active?: boolean;
  items: Item[];
  onSelectCurrentItem?: (item: Item) => void;
}) => {
  // Keep state reference to last item selected by cursor and mouse
  const [selectedItemUnsafe, setSelectedItem] = useState<Item | undefined>(
    undefined
  );

  const getIndexCurrentItem = () =>
    selectedItemUnsafe ? items.indexOf(selectedItemUnsafe) : -1;

  const setNextItem = () => {
    if (items.length === 0) {
      return;
    }
    const currentIndex = getIndexCurrentItem();
    const atEndOfList = currentIndex === items.length - 1;
    if (currentIndex === -1) {
      setSelectedItem(items[0]);
    } else if (!atEndOfList) {
      setSelectedItem(items[currentIndex + 1]);
    }
  };
  const setPrevItem = () => {
    if (items.length === 0) {
      return;
    }
    const currentIndex = getIndexCurrentItem();
    const atBeginningOfList = currentIndex === 0;
    if (currentIndex === -1) {
      setSelectedItem(items[items.length - 1]);
    } else if (!atBeginningOfList) {
      setSelectedItem(items[currentIndex - 1]);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowDown":
      case "j":
        setNextItem();
        event.preventDefault();
        break;
      case "ArrowUp":
      case "k":
        setPrevItem();
        event.preventDefault();
        break;
      case "Enter":
        active &&
          onSelectCurrentItem &&
          selectedItemUnsafe &&
          onSelectCurrentItem(selectedItemUnsafe);
        break;
    }
  };

  // Handle keyboard interactions up and down to select items
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  });

  const currentSelected =
    selectedItemUnsafe && items.includes(selectedItemUnsafe)
      ? selectedItemUnsafe
      : undefined;

  const handleOtherInteraction = (item: Item | undefined) => {
    setSelectedItem(item);
  };

  return {
    /**
     * The currently selected item
     */
    currentSelected,
    /**
     * Should be called if another item should be highlighted/selected from another UI interaction, e.g. a mouse hover
     */
    handleOtherInteraction,
  };
};
