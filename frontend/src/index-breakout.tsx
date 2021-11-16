import React from "react";
import ReactDOM from "react-dom";
import { App as BreakoutApp } from "./components/BreakoutApp";
import "./styles/index.css";
import { IBreakoutAppOnSubmit } from "./types/breakoutAppPublic";
import { IBreakoutPayload } from "./types/imgixSF";

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

    var handleSelect: IBreakoutAppOnSubmit = function handleSelect({ src }) {
      // The value changed and the breakout editor's host is informed about the
      // value update via a `sfcc:value` event.

      if (!src) {
        return;
      }
      const payload: IBreakoutPayload = { src };
      emit({
        type: "sfcc:value",
        payload,
      });
    };

    ReactDOM.render(
      <React.StrictMode>
        <BreakoutApp apiKey={config.api.apiKey} onSubmit={handleSelect} />
      </React.StrictMode>,
      rootEditorElement
    );
  });
};
