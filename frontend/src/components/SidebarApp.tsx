import React from "react";
import Imgix from "react-imgix";
// TODO(luis): replace placeholder image
import "../styles/App.css";
import { AddImageIcon } from "./buttons/AddImageIcon";

declare const emit: Function;
declare const subscribe: Function;

let localization: any;

subscribe("sfcc:ready", async ({ config }: any) => {
  // Extract `localization` data from `config`
  ({ localization = {} } = config);
});

subscribe("sfcc:value", async (response: any) => {
  console.log("sfcc:value", response);
});

function handleBreakoutApply(value: any) {
  console.log(value, " from breakoutApply");
  emit({
    type: "sfcc:value",
    payload: value,
  });
}

function handleBreakoutCancel(value: any) {
  // Grab focus
  console.log(value, " from cancel");
}

function _handleBreakoutClose({ type, value, cb }: any) {
  // Now the "value" can be passed back to Page Designer
  if (type === "sfcc:breakoutApply") {
    handleBreakoutApply(value);
    cb(value);
  } else {
    handleBreakoutCancel(value);
  }
}

// Wraps handleBreakoutClose to pass the callback to the handler
function handleBreakoutClose(cb: any, payload: any) {
  _handleBreakoutClose({ ...payload, cb });
}

function handleBreakoutOpen(cb: Function) {
  console.log("open breakout");

  emit(
    {
      type: "sfcc:breakout",
      payload: {
        id: "imgixEditorBreakoutScript",
        title: `${localization.titleBreakout}`,
      },
    },
    (payload: any) => {
      handleBreakoutClose(cb, payload);
    }
  );
}

export function App() {
  const [url, setImageUrl] = React.useState("");

  const updateImageUrl = (value: { imgUrl: string }) => {
    setImageUrl(value.imgUrl);
  };

  const handleClick = () => {
    handleBreakoutOpen(updateImageUrl);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Imgix
            src="https://assets.imgix.net/amsterdam.jpg"
            imgixParams={{
              w: 350,
            }}
          />
          <AddImageIcon handleClick={handleClick} />
          <input
            id={"selectedImgUrl"}
            style={{ border: "solid black 1px" }}
            value={url}
          />
        </div>
      </header>
    </div>
  );
}
