import React from "react";
import ReactDOM from "react-dom";
import { App as SidebarApp } from "./components/SidebarApp";
import "./styles/index.css";
import { SandboxSubscribe } from "./types";
import { IImgixCustomAttributeValue } from "./types/imgixSF";

declare const emit: Function;
declare const subscribe: SandboxSubscribe<
  Record<string, string | number | object>
>;

export const createSidebarApp = () => {
  let localization: any;
  let imgixApi: {
    apiKey?: string;
    enabled?: boolean;
  };

  subscribe(
    "sfcc:ready",
    async ({
      value = {},
      config,
      isDisabled,
      isRequired,
      dataLocale,
      displayLocale,
    }: any) => {
      // Extract `localization` data from `config`
      ({ localization = {}, imgixApi = {} } = config);

      let state: {
        value: IImgixCustomAttributeValue | {};
      } = {
        value: value || {},
      };

      const setState = (newState: typeof state) => {
        state = newState;
        renderApp();
      };

      function handleBreakoutApply(payload: IImgixCustomAttributeValue) {
        // Emit value update to Page Designer host application
        emit({
          type: "sfcc:value",
          payload: payload,
        });
        setState({ value: payload });
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

      const handleValueClear = () => {
        emit({
          type: "sfcc:value",
          payload: {},
        });
        setState({
          value: {},
        });
      };

      // Initialize the DOM
      var rootEditorElement = document.createElement("div");
      rootEditorElement.innerHTML = `<h3>Sidebar: should be replaced by React</h3>`;
      document.body.appendChild(rootEditorElement);
      function renderApp() {
        const safeValue =
          state.value != null &&
          state.value.hasOwnProperty("src") &&
          (state.value as any).src != null &&
          (state.value as any).src !== ""
            ? (state.value as IImgixCustomAttributeValue)
            : undefined;

        ReactDOM.render(
          <React.StrictMode>
            <SidebarApp
              onOpenBreakoutClick={handleBreakoutOpen}
              onClear={handleValueClear}
              value={safeValue}
              disabled={imgixApi.enabled === false}
            />
          </React.StrictMode>,
          rootEditorElement
        );
      }

      renderApp();
    }
  );
};
