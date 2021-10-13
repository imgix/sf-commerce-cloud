import { App as IntApp } from "./IntImgixPd";
import { App as BmApp } from "./BmImgixPd";

let App: any;

if (process.env.REACT_APP_APP_TYPE === "int") {
  App = IntApp;
} else if (process.env.REACT_APP_APP_TYPE === "bm") {
  App = BmApp;
} else {
  throw new Error("REACT_APP_APP_TYPE is not set");
}

export { App };
