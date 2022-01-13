declare const chrome: any;

const productsLabelSelector = '[data-dw-tooltip="Product.imgixData"]';
export const injectExtensionApp = () => {
  const productsLabel = document.querySelector(productsLabelSelector);
  const productsLabelParentTable = productsLabel?.closest("table");
  const closestTD = productsLabelParentTable?.closest("td");

  if (!closestTD) {
    return;
  }

  closestTD.nextElementSibling?.remove();
  closestTD.setAttribute("colspan", "2");

  closestTD.innerHTML = "Insert React App here!";
  // uncomment next line when React app is ready
  // ReactDOM.render(<App />, closestTD)
};

export const injectExtensionAppWithInterval = () => {
  const interval = setInterval(() => {
    console.log("[imgix] Starting search for products label");
    if (document.querySelector(productsLabelSelector)) {
      console.log("[imgix] Products label found, clearing interval");
      clearInterval(interval);
      injectExtensionApp();
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
