import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
import "./styles/index.css";

declare const listen: Function;

var rootEditorElement;

/**
 * Initializes the base markup before page is ready. This is not part of the API, and called explicitly at the end of this module.
 */
function init() {
  rootEditorElement = document.createElement("div");
  rootEditorElement.innerHTML = `<h3>Sidebar: should be replaced by React</h3>`;
  document.body.appendChild(rootEditorElement);
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootEditorElement
  );
}

export const createSidebarApp = () => {
  listen("sfcc:ready", () => {
    init();
  });

  // When a value was selected
  listen("sfcc:value", (value: any) => {});
  // When the editor must require the user to select something
  listen("sfcc:required", (value: any) => {});
  // When the editor is asked to disable its controls
  listen("sfcc:disabled", (value: any) => {});

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  // reportWebVitals();
};
