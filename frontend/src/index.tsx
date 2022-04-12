import { createBreakoutApp } from "./index-breakout";
import { runExtension } from "./index-extension";
import { createSidebarApp } from "./index-sidebar";
import { setAPIEnvironment } from "./services/imgixAPIService";

if (process.env.REACT_APP_APP_TYPE === "sidebar") {
  setAPIEnvironment("page_designer");
  createSidebarApp();
} else if (process.env.REACT_APP_APP_TYPE === "breakout") {
  setAPIEnvironment("page_designer");
  createBreakoutApp();
} else if (process.env.REACT_APP_APP_TYPE === "extension") {
  setAPIEnvironment("products");
  runExtension();
} else {
  throw new Error("REACT_APP_APP_TYPE is not set");
}
