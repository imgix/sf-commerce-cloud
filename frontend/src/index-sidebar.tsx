import React from "react";
import ReactDOM from "react-dom";
import { App as SidebarApp } from "./components/SidebarApp";
import "./styles/index.css";
import { SandboxSubscribe } from "./types";
import { IBreakoutPayload } from "./types/imgixSF";

declare const emit: Function;
declare const subscribe: SandboxSubscribe<
  Record<string, string | number | object>
>;

var rootEditorElement;

export const createSidebarApp = () => {
  let localization: any;

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
      // Extract `localization` data from `config`
      ({ localization = {} } = config);

      function handleBreakoutApply(payload: IBreakoutPayload) {
        // Emit value update to Page Designer host application
        emit({
          type: "sfcc:value",
          payload: payload,
        });
      }

      function handleBreakoutClose({ type, value }: any) {
        // Now the "value" can be passed back to Page Designer
        if (type === "sfcc:breakoutApply") {
          handleBreakoutApply(value);
        }
      }

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

      // Initialize the DOM
      rootEditorElement = document.createElement("div");
      rootEditorElement.innerHTML = `<h3>Sidebar: should be replaced by React</h3>`;
      document.body.appendChild(rootEditorElement);
      ReactDOM.render(
        <React.StrictMode>
          <SidebarApp handleBreakoutOpen={handleBreakoutOpen} />
        </React.StrictMode>,
        rootEditorElement
      );
    }
  );
};
