import ReactDOM from "react-dom";
import { IImgixCustomAttribute } from "../../types";
import { ExtensionApp } from "./components/ExtensionApp";
import styles from "./index-extension.module.scss";

// read the environment variable
const DEVELOPMENT_API_KEY = process.env.IMGIX_API_KEY || undefined;

// extend the window type to include browser key as any
declare global {
  interface Window {
    browser: any;
    msBrowser: any;
    chrome: any;
  }
}

// Browser polyfill
window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();
const browser = window.browser;

const productsLabelSelector = '[data-dw-tooltip="Product.imgixData"]';
export const injectExtensionApp = () => {
  /**
   * Note:
   *
   * We need to make a new table to hold the extension app
   * because including the extension app in the same table
   * as the imgix custom attribute textarea causes the other
   * table rows to be shifted right as the extension app
   * adds more images. This table _has_ to be outside the "root"
   * table that holds the product attributes. Otherwise, the
   * styling on the page is messed up.
   *
   */

  const productsLabel = document.querySelector(productsLabelSelector);
  const productsLabelParentTable = productsLabel?.closest("table");
  const closestTR = productsLabelParentTable?.closest("tr");
  // The imgix custom attribute json
  const customAttributeTextarea = closestTR?.querySelector("textarea");
  // Find and store the product attributes table for the imgix custom attribute
  const productAttributesTable = productsLabelParentTable?.parentElement?.closest(
    "table"
  );

  if (!closestTR || !customAttributeTextarea || !productAttributesTable) {
    return;
  }

  const newTable = document.createElement("table");
  const newTB = document.createElement("tbody");
  const newTR = document.createElement("tr");
  const newTD = document.createElement("td");

  newTD.setAttribute("colspan", "2");
  newTD.setAttribute("class", styles.appContainer);
  newTR.appendChild(newTD);
  newTB.appendChild(newTR);
  newTable.appendChild(newTB);

  // Add the new table with the extension app to the DOM
  productAttributesTable?.insertAdjacentElement("afterend", newTable);

  // keep the imgix custom attribute JSON from rendering but leave it editable
  closestTR.style.display = "none";

  /**
   * Set the imgix custom attribute value.
   * @param value The stringified JSON value to set in the custom attribute textarea
   */
  const setCustomAttributeValue = (data: IImgixCustomAttribute) => {
    const value = JSON.stringify(data);
    // TODO: check correct way to set textarea value
    customAttributeTextarea.value = value;
  };

  const customAttrTextAreaValue = customAttributeTextarea.value || "{}";
  const customAttributeValue = JSON.parse(customAttrTextAreaValue);

  const data = {
    images: customAttributeValue.images || [],
  };

  browser?.storage?.sync.get(
    {
      ix22sfccak: "",
    },
    (value: any) => {
      console.log("[imgix] browser.storage sync completed");
      ReactDOM.render(
        <ExtensionApp
          apiKey={value.ix22sfccak}
          data={data}
          onChange={setCustomAttributeValue}
        />,
        newTD
      );
    }
  ) ||
    ReactDOM.render(
      <ExtensionApp
        apiKey={DEVELOPMENT_API_KEY || ""}
        data={data}
        onChange={setCustomAttributeValue}
      />,
      newTD
    );
};

export const injectExtensionAppWithInterval = () => {
  let n = 0;
  const interval = setInterval(() => {
    console.log("[imgix] Starting search for products label");
    if (document.querySelector(productsLabelSelector)) {
      console.log("[imgix] Products label found, clearing interval");
      clearInterval(interval);
      injectExtensionApp();
      return;
    }
    n++;
    if (n > 3000 /* 3000 * 10ms = 30s */) {
      clearInterval();
      console.log("[imgix] Products label not found, clearing interval");
    }
  }, 10);
};

export const runExtension = () => {
  browser.runtime.sendMessage({}, () => {
    const readyStateCheckInterval = setInterval(function () {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        console.log("[imgix] Content Script initiated");
        injectExtensionAppWithInterval();
      }
    }, 10);
  });
};
