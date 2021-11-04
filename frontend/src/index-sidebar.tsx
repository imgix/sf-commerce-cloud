import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
import "./styles/index.css";

declare const emit: Function;
declare const subscribe: Function;

var rootEditorElement;

export const createSidebarApp = () => {
  let localization: any;
  let buttonEl: any;

  subscribe(
    "sfcc:ready",
    async ({
      value,
      config,
      isDisabled,
      isRequired,
      dataLocale,
      displayLocale,
    }: any) => {
      console.log(
        "sidebar-trigger::sfcc:ready",
        dataLocale,
        displayLocale,
        isDisabled,
        isRequired,
        value,
        config
      );

      // Extract `localization` data from `config`
      ({ localization = {} } = config);

      // Initialize the DOM
      rootEditorElement = document.createElement("div");
      rootEditorElement.innerHTML = `<h3>Sidebar: should be replaced by React</h3>`;
      document.body.appendChild(rootEditorElement);
      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        rootEditorElement
      );

      // Obtain DOM elements and apply event handlers
      buttonEl = document.querySelector(".ix-btn");
      buttonEl.addEventListener("click", handleBreakoutOpen);
    }
  );

  function handleBreakoutOpen() {
    emit(
      {
        type: "sfcc:breakout",
        payload: {
          id: "imgixEditorBreakoutScript",
          title: `${localization.titleBreakout}`,
        },
      },
      handleBreakoutClose
    );
  }

  function handleBreakoutClose({ type, value }: any) {
    // Now the "value" can be passed back to Page Designer
    if (type === "sfcc:breakoutApply") {
      handleBreakoutApply(value);
    } else {
      handleBreakoutCancel();
    }
  }

  function handleBreakoutCancel() {
    // Grab focus
    buttonEl && buttonEl.focus();
  }

  function handleBreakoutApply(value: any) {
    // Emit value update to Page Designer host application
    emit({
      type: "sfcc:value",
      payload: value,
    });
  }
};
