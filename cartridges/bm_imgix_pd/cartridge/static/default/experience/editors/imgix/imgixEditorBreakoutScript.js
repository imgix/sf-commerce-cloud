// Code in the client-side JavaScript file for the breakout editor
(() => {
    subscribe('sfcc:ready', () => {
        // Once the breakout editor is ready, the custom code is able to select or
        // Create a value. Any meaningful change to a value/selection needs to be
        // reflected back into the host container via a `sfcc:value` event.
        const template = document.createElement('template');
        template.innerHTML = "<div>image goes here</div>";
        const clone = document.importNode(template.content, true);
        document.body.appendChild(clone);
        const openButtonEl = document.querySelector('p');
        openButtonEl.addEventListener('click', handleSelect);
    });

    function handleSelect({ target }) {
        // The value changed and the breakout editor's host is informed about the
        // value update via a `sfcc:value` event.
        const selectedValue = target.innerText;
        emit({
            type: 'sfcc:value',
            payload: selectedValue ? { value: selectedValue } : null
        });
    }
})();
