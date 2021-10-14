import React, { ReactElement } from "react";
import { SourceSelect as _SourceSelect } from "../components/buttons/dropdowns/SourceSelect";
import { ImgixGETSourcesData } from "../types";
import "./ButtonLayout.css";

interface Props {
  sources: ImgixGETSourcesData;
}

export function SourceSelect({ sources }: Props): ReactElement {
  const handleSelect = (source: string) => {};
  return (
    <div className="button-story-layout">
      <_SourceSelect handleSelect={handleSelect} sources={sources} />
    </div>
  );
}
