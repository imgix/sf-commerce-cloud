import React, { ReactElement } from "react";
import "../styles/LoadingSpinner.css";
interface Props {
  loading: boolean;
}

export function LoadingSpinner({ loading }: Props): ReactElement {
  return loading ? (
    <div className="ix-loading-container">
      <div className="ix-loading-indicator"></div>
      <p>Loading assets...</p>
    </div>
  ) : (
    <></>
  );
}
