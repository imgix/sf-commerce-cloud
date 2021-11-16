import React, { ReactElement } from "react";
import { Button } from "./Button";

interface Props {
  handleClick?: () => void;
  imageSrc?: string;
}

export function AddImageIcon({ handleClick, imageSrc }: Props): ReactElement {
  return (
    <div className="ix-select-image-container">
      <Button label="Add an imgix image" onClick={handleClick} />
    </div>
  );
}
