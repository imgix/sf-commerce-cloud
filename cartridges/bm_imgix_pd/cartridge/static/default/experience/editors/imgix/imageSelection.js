(() => {
  var rootEditorElement;
  /**
   * Initializes the base markup before page is ready. This is not part of the API, and called explicitly at the end of this module.
   */
  function init() {
    rootEditorElement = document.createElement("div");
    rootEditorElement.innerHTML = `<h3>Hello World</h3>`;
    document.body.appendChild(rootEditorElement);
  }

  // When a value was selected
  listen("sfcc:value", (value) => {});
  // When the editor must require the user to select something
  listen("sfcc:required", (value) => {});
  // When the editor is asked to disable its controls
  listen("sfcc:disabled", (value) => {});

  init();
})();
