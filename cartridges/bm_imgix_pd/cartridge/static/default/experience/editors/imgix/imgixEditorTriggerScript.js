// Code in the client-side JavaScript file for the trigger editor
(() => {
    let localization;
    let buttonEl;

    subscribe('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
        console.log('magical-trigger::sfcc:ready', dataLocale, displayLocale, isDisabled, isRequired, value, config);

        // Extract `localization` data from `config`
        ({ localization = {} } = config);

        // Initialize the DOM
        const template = obtainTemplate();
        const clone = document.importNode(template.content, true);
        document.body.appendChild(clone);

        // Obtain DOM elements and apply event handlers
        buttonEl = document.querySelector('button');
        buttonEl.addEventListener('click', handleBreakoutOpen);

    });

    function obtainTemplate() {
        const { placeholder, buttonBreakout } = localization;
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="image-select no-image">
            <div class="image-data">
            <button type="button" class="slds-button slds-button_neutral">
                ${buttonBreakout}
                </button>
            </div>
        </div>
        `;
        return template;
    }

    function obtainDisplayValue(value) {
        return typeof value === 'object' && value != null && typeof value.value === 'string' ? value.value : null;
    }
    function handleBreakoutOpen() {
        emit({
            type: 'sfcc:breakout',
            payload: {
                id: 'imgixEditorBreakoutScript',
                title: `${localization.titleBreakout}`
            }
        }, handleBreakoutClose);
    }

    function handleBreakoutClose({ type, value }) {
        // Now the "value" can be passed back to Page Designer
        if (type === 'sfcc:breakoutApply') {
            handleBreakoutApply(value);
        } else {
            handleBreakoutCancel();
        }
    }

    function handleBreakoutCancel() {
        // Grab focus
        buttonEl && buttonEl.focus();
    }

    function handleBreakoutApply(value) {
        // Emit value update to Page Designer host application
        emit({
            type: 'sfcc:value',
            payload: value
        });
    }
})();
