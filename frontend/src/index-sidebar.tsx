import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
import "./styles/index.css";



var rootEditorElement;

export const createSidebarApp = () => {

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

};
