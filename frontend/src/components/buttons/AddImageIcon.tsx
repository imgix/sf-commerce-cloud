import React, { ReactElement } from "react";
import { Button } from "./Button";

interface Props {
  handleClick?: () => void;
  imageSrc?: string;
}

export function AddImageIcon({ handleClick, imageSrc }: Props): ReactElement {
  return (
    <div className="ix-select-image-container">
      <Button label="Select an image from Origin" onClick={handleClick} />
    </div>
  );
}
