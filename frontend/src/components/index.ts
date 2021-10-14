import { App as SidebarApp } from "./SidebarApp";
import { App as BreakoutApp } from "./BreakoutApp";

let App: any;

if (process.env.REACT_APP_APP_TYPE === "sidebar") {
  App = SidebarApp;
} else if (process.env.REACT_APP_APP_TYPE === "breakout") {
  App = BreakoutApp;
} else {
  throw new Error("REACT_APP_APP_TYPE is not set");
}

export { App };
