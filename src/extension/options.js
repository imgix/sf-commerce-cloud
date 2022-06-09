/**
 * This file is loaded when the extension options page is rendered.
 *
 * It sets up the event listeners for the save and restore buttons and
 * the input field. These listeners are used to save and restore the
 * imgix API key to browser.storage.
 */

// Browser polyfill
window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();
const browser = window.browser;

/**
 * Read the API key from the input field
 * @returns {string}
 */
function getInputApiKey() {
  return document.getElementById("api_key")?.value || "";
}

/**
 *
 * @param {string} apiKey - imgix API key
 * @returns {boolean} `true` if the key is valid `false` otherwise
 */
async function validateKey(apiKey) {
  const url = `https://api.imgix.com/api/v1/sources?sort=name&fields[sources]=name,deployment.custom_domains,deployment.type&filter[enabled]=true`;
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/vnd.api+json",
      "User-Agent": "imgix sfcc extension",
    },
  });

  if (!response.ok) {
    const details = await response.json();
    const message = Error(
      details ? details.message || details.error : "Unknown API error"
    );
    console.log(message);
    return false;
  }
  return true;
}

/**
 * Update the status text and target element color as per the status
 * @param {string} statusText - text to display in the status bar
 * @param {Object} options
 * @param {string} options.color - color of the status bar
 * @param {string} options.elementId - id of the element to update
 * @param {boolean} options.shouldClearAfterTimeout - should the message be cleared after a timeout?
 */
function updateStatus(
  statusText,
  { color, elementId, shouldClearAfterTimeout = true } = {}
) {
  var status = document.getElementById("status");
  var targetElement = elementId
    ? document.getElementById(elementId)
    : document.getElementById("save");
  if (!targetElement) {
    return;
  }

  // Update status to let user know options were saved.
  status.textContent = statusText;
  status.style.color = color || "#475F72";

  targetElement.setAttribute("disabled", "disabled");
  if (shouldClearAfterTimeout) {
    setTimeout(function () {
      // reset the status message after 750ms
      status.textContent = "";
      targetElement.removeAttribute("disabled");
      // restore color to default
    }, 2000);
  }
}

/**
 * Update post-save instructions
 */
function updatePostSaveInstructions(text) {
  var instructions = document.getElementById("post-save-instructions");
  if (!instructions) {
    return;
  }
  instructions.textContent = text;
  instructions.style.display = "block";
}

/**
 * Set the api key input field to the argument
 * @param {string} value - api key string to set in the input field
 */
function setInputFieldValue(value) {
  document.getElementById("api_key").value = value;
}

/**
 * Saves options to browser.storage
 * @param {string} apiKey - imgix API key
 * @returns {Promise<boolean>}
 */
async function saveOptions() {
  updateStatus("Saving...", { shouldClearAfterTimeout: false });
  var token = getInputApiKey();
  // Only save if the key is valid
  const isKeyValid = await (async () => {
    if (token === "") {
      return true;
    }
    return await validateKey(token);
  })();

  if (isKeyValid) {
    // Save the new API key to browser storage
    browser.storage.sync.set(
      {
        ix22sfccak: token,
      },
      function () {
        updateStatus("Options saved.", "#28e398");
        if (token !== "") {
          updatePostSaveInstructions(
            "Success! Now you can go to any Salesforce product in your Business Manager and associate images from the imgix Asset Manager with your products."
          );
        }
      }
    );
  } else {
    updateStatus("Invalid API key", "#f8510f");
  }
}

/**
 * Restores select box and checkbox state using the preferences
 * stored in browser.storage.
 * @returns {Promise<void>}
 */
function restoreOptions() {
  var token;
  browser.storage.sync.get(
    {
      ix22sfccak: "",
    },
    function (storedData) {
      token = storedData["ix22sfccak"];
      document.getElementById("api_key").value = token;
      if (token === "") {
        return;
      }
      updateStatus("Restoring saved API key...");

      validateKey(token).then((isValid) => {
        if (isValid) {
          updateStatus("Saved API key restored.");
        } else {
          updateStatus("Saved API key restored, but invalid.", {
            color: "#f8510f",
          });
        }
      });
    }
  );
}

/**
 * On "enter" key press, save the options to browser.storage
 * @param {KeyboardEvent} e - key event
 * @returns {void}
 */
function onKeyPress(e) {
  if (e.keyCode === 13) {
    save_options();
  }
}

// Restore the options when the extension is loaded
document.addEventListener("DOMContentLoaded", restoreOptions);
// Attack an "enter" key press on the input field
document.getElementById("api_key").addEventListener("keyup", onKeyPress);
// Save options to browser.storage when the save button is clicked
document.getElementById("save").addEventListener("click", saveOptions);
// Restore options to empty values when the reset button is clicked
document.getElementById("reset").addEventListener("click", restoreOptions);
