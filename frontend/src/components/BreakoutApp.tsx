import React from "react";
import { AssetBrowserContainer as AssetBrowser } from "./AssetBrowser/AssetBrowserContainer";

interface Props {
    handleSubmit: () => (event: string, type: string) => void;
    apiKey:string | null
}
export function App({ handleSubmit, apiKey }: Props) {
    return (
        <div className="App">
            <header className="App-header">
                <AssetBrowser apiKey={apiKey} handleBrowserClick={handleSubmit} anotherProp="hello" />
            </header>
        </div>
    );

