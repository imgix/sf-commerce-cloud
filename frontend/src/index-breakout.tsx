import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
import "./styles/index.css";

declare const subscribe: Function;
declare const emit: Function;

var rootEditorElement;

type ConfigT = {
  api: {
    [key: string]: any;
  };
  localization: {
    [key: string]: any;
  };
  options: {
    [key: string]: any;
  };
};

export const createBreakoutApp = () => {
  subscribe("sfcc:ready", ({ config }: { config: ConfigT }) => {
    rootEditorElement = document.createElement("div");
    rootEditorElement.innerHTML = `<h3>Breakout: should be replaced by React</h3>`;
    document.body.appendChild(rootEditorElement);

    function handleSelect({ target }: any) {
      // The value changed and the breakout editor's host is informed about the
      // value update via a `sfcc:value` event.
      const selectedValue = target.innerText;
      emit({
        type: "sfcc:value",
        payload: selectedValue ? { value: selectedValue } : null,
      });
    }

    ReactDOM.render(
      <React.StrictMode>
        <App apiKey={config.api.apiKey} handleSubmit={handleSelect} />
      </React.StrictMode>,
      rootEditorElement
    );
  });
};
