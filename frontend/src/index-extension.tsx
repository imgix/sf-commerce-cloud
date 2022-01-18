import ReactDOM from "react-dom";
import { ExtensionApp } from "./components/ExtensionApp";
import styles from "./index-extension.module.scss";

declare const chrome: any;

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

  // reduce the custom attribute value to an array of images, where each image
  // is an object with src, sourceWidth, and imageType properties
  const storeCustomAttributeImages = (customAttributeValue: any) => {
    let customImages = [];
    // add the primary image to the array of images
    customImages.push({
      src: customAttributeValue?.images?.primary?.src,
      sourceWidth: customAttributeValue?.images?.primary?.sourceWidth,
      imageType: "primary",
    });
    customImages.push(
      ...customAttributeValue?.images?.alternatives?.map((image: any) => ({
        src: image.src,
        sourceWidth: image.sourceWidth,
        imageType: "alternative",
      }))
    );
    // add the swatch images to the array of images
    customImages.push(
      ...customAttributeValue?.swatchImages?.map((image: any) => ({
        src: image.src,
        sourceWidth: image.sourceWidth,
        imageType: "swatch",
      }))
    );

    return customImages;
  };

  const images = storeCustomAttributeImages(customAttributeValue);

  // uncomment next line and setCustomAttributeValue function when React app is ready
  ReactDOM.render(
    <ExtensionApp images={images} onChange={setCustomAttributeValue} />,
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
  chrome.extension.sendMessage({}, function (response: any) {
    var readyStateCheckInterval = setInterval(function () {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        console.log("[imgix] Content Script initiated");
        injectExtensionAppWithInterval();
      }
    }, 10);
  });
};
