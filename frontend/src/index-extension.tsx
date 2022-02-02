import ReactDOM from "react-dom";
import { ExtensionApp } from "./components/ExtensionApp";
import styles from "./index-extension.module.scss";

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
  const productsLabel = document.querySelector(productsLabelSelector);
  const productsLabelParentTable = productsLabel?.closest("table");
  const closestTR = productsLabelParentTable?.closest("tr");
  const customAttributeTextarea = closestTR?.querySelector("textarea");

  if (!closestTR || !customAttributeTextarea) {
    return;
  }

  const newTR = document.createElement("tr");
  const newTD = document.createElement("td");
  newTD.setAttribute("colspan", "2");
  newTD.setAttribute("class", styles.appContainer);
  newTR.appendChild(newTD);

  closestTR.insertAdjacentElement("afterend", newTR);
  closestTR.style.display = "none";

  /**
   * Set the imgix custom attribute value.
   * @param value The stringified JSON value to set in the custom attribute textarea
   */
  const setCustomAttributeValue = (value: string) => {
    // TODO: check correct way to set textarea value
    customAttributeTextarea.value = value;
  };

  const customAttributeValue = JSON.parse(customAttributeTextarea.value);

  const data = {
    images: customAttributeValue.images || [],
    swatches: customAttributeValue?.swatches,
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
        apiKey={""}
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
  browser.extension.sendMessage({}, function (response: any) {
    var readyStateCheckInterval = setInterval(function () {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        console.log("[imgix] Content Script initiated");
        injectExtensionAppWithInterval();
      }
    }, 10);
  });
};
