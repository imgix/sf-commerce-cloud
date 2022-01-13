import { createBreakoutApp } from "./index-breakout";
import { createSidebarApp } from "./index-sidebar";
import { runExtension } from "./index-extension";

if (process.env.REACT_APP_APP_TYPE === "sidebar") {
  createSidebarApp();
} else if (process.env.REACT_APP_APP_TYPE === "breakout") {
  createBreakoutApp();
} else if (process.env.REACT_APP_APP_TYPE === "extension") {
  runExtension();
} else {
  throw new Error("REACT_APP_APP_TYPE is not set");
}
