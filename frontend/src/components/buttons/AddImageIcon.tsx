import React, { ReactElement } from "react";
import { Button } from "./Button";
// TODO(luis): replace placeholder image
import imageSrc from "../../images/andreas-gucklhorn-unsplash.jpg";

interface Props {
  handleClick?: () => void;
}

export function AddImage({ handleClick }: Props): ReactElement {
  return (
    <div className="ix-select-image-container">
      <div className="ix-select-image-btn" onClick={handleClick}>
        <img width="200" height="150" src={imageSrc} alt="camera-svg-icon" />
      </div>
      <Button label="Select an image from Origin" onClick={handleClick} />
    </div>
  );
}
