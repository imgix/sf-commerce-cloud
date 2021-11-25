import React, { ReactElement } from "react";
import { SourceSelect as _SourceSelect } from "../components/buttons/dropdowns/SourceSelect";
import { ImgixGETSourcesData } from "../types";
import "../styles/App.css";
import "./ButtonLayout.css";

interface Props {
  sources: ImgixGETSourcesData;
}

export function SourceSelect({ sources }: Props): ReactElement {
  const [selectedSource, setSelectedSource] = React.useState(sources[0]);
  const handleSourceSelect = (sourceId: string) => {
    // store the selected source and fetch its assets
    const source = sources.find(
      (currentSource: ImgixGETSourcesData[0]) => currentSource.id === sourceId
    );
    if (!source) return;
    setSelectedSource(source);
  };
  return (
    <div className="button-story-layout">
      <_SourceSelect
        handleSelect={handleSourceSelect}
        selectedSource={selectedSource}
        sources={sources}
      />
    </div>
  );
}
