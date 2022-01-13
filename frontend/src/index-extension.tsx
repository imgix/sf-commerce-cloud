declare const chrome: any;

export const injectExtensionApp = () => {
  const el = document.querySelector('[data-dw-tooltip="Product.imgixData"]');
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
};

export const runExtension = () => {
  chrome.extension.sendMessage({}, function (response: any) {
    var readyStateCheckInterval = setInterval(function () {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        // ----------------------------------------------------------
        // This part of the script triggers when page is done loading
        console.log("Hello. This message was sent from scripts/inject.js");
        // ----------------------------------------------------------

        setTimeout(injectExtensionApp, 3000);
      }
    }, 10);
  });
};
