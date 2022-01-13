declare const chrome: any;

export const injectExtensionApp = () => {
  const el = document.querySelector('[data-dw-tooltip="Product.imgixData"]');
  console.log(`el`, el);
  if (el) {
    el.innerHTML = "Hello World (came from the Browser Extension)!";
  }
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
