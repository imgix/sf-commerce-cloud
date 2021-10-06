import React, { ReactElement } from "react";
import { SourceSelect as _SourceSelect } from "../components/buttons/dropdowns/SourceSelect";
import { SourcePropsT } from "../types";
import "./ButtonLayout.css";

interface Props {
  sources: SourcePropsT[];
}

export function SourceSelect({ sources }: Props): ReactElement {
  return (
    <div className="button-story-layout">
      <_SourceSelect sources={sources} />
    </div>
  );
}
