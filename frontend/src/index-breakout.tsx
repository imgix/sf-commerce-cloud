import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
import "./styles/index.css";

declare const listen: Function;
declare const subscribe: Function;
declare const emit: Function;

var rootEditorElement;

export const createBreakoutApp = () => {
  subscribe("sfcc:ready", () => {
    rootEditorElement = document.createElement("div");
    rootEditorElement.innerHTML = `<h3>Breakout: should be replaced by React</h3>`;
    document.body.appendChild(rootEditorElement);
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      rootEditorElement
    );
    const openButtonEl = document.querySelector(".ix-selection");
    if (openButtonEl) {
      openButtonEl.addEventListener("click", handleSelect);
    }
  });

  function handleSelect({ target }: any) {
    // The value changed and the breakout editor's host is informed about the
    // value update via a `sfcc:value` event.
    const selectedValue = target.innerText;
    emit({
      type: "sfcc:value",
      payload: selectedValue ? { value: selectedValue } : null,
    });
  }
};
