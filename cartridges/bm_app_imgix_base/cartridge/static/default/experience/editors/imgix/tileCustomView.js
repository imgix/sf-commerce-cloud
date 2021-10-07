(() => {
  var rootEditorElement;
  /**
   * initializes the base markup before page is ready. This is not part of the API, and called explicitely at the end of this module.
   */
  function init() {
    rootEditorElement = document.createElement('div');
    rootEditorElement.innerHTML = `
      <div class="slds-radio_button-group">
        <span class="slds-button slds-radio_button">
          <label class="slds-radio_button__label" for="tile">
            <span class="slds-radio_faux">Sample Text</span>
          </label>
          <input type="text" name="displayFormat" id="tile" value="tile" checked />
        </span>
        </div>`;
    document.body.appendChild(rootEditorElement);
  };

  // When a value was selected
  listen('sfcc:value', value => { });
  // When the editor must require the user to select something
  listen('sfcc:required', value => { });
  // When the editor is asked to disable its controls
  listen('sfcc:disabled', value => {
    if (rootEditorElement) {
      rootEditorElement.querySelector('.btn-group').disabled = true;
    }
  });

  init();

})();