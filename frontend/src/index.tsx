import { createBreakoutApp } from "./index-breakout";
import { createSidebarApp } from "./index-sidebar";

if (process.env.REACT_APP_APP_TYPE === "sidebar") {
  createSidebarApp();
} else if (process.env.REACT_APP_APP_TYPE === "breakout") {
  createBreakoutApp();
} else {
  throw new Error("REACT_APP_APP_TYPE is not set");
}
