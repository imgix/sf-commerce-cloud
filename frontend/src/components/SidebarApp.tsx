import React, { useState } from "react";
import Imgix from "react-imgix";
// TODO(luis): replace placeholder image
import "../styles/App.css";
import { AddImageIcon } from "./buttons/AddImageIcon";

declare const emit: Function;
declare const subscribe: Function;

export function App() {
  const [imgUrl, setImgUrl] = useState("");
  let localization: any;
  let buttonEl: any;

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
    }
  );
  function handleBreakoutApply(value: any) {
    emit({
      type: "sfcc:value",
      payload: value,
    });
  }

  function handleBreakoutCancel(value: any) {
    // Grab focus
    console.log(value, " from cancel");
    buttonEl && buttonEl.focus();
  }

  function handleBreakoutClose({ type, value }: any) {
    setImgUrl(value.imgUrl);
    // Now the "value" can be passed back to Page Designer
    if (type === "sfcc:breakoutApply") {
      handleBreakoutApply(value);
    } else {
      handleBreakoutCancel(value);
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

  const memoizedHandleBreakoutOpen = React.useCallback(
    () => {
      handleBreakoutOpen();
    },
    // Tells React to memoize regardless of arguments.
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {imgUrl.length > 0 ? (
            <Imgix
              src={imgUrl}
              imgixParams={{
                w: 350,
              }}
            />
          ) : null}
          <AddImageIcon handleClick={memoizedHandleBreakoutOpen} />
        </div>
      </header>
    </div>
  );
}
