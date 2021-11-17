import React, { ReactElement } from "react";
import { ImgixGETSourcesData } from "../../../types";
import { Button } from "../Button";
import { SourceMenuSvg } from "../../icons/SourceMenuSvg";

import "../../../styles/Button.css";
import "../../../styles/SourceSelect.css";

interface Props {
  sources: ImgixGETSourcesData;
  selectedSource: ImgixGETSourcesData[0] | null;
  handleSelect: (sourceId: string) => void;
}

export function SourceSelect({
  sources,
  selectedSource,
  handleSelect,
}: Props): ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);

  const updateSource = (sourceId: string) => {
    setIsOpen(false);
    handleSelect(sourceId);
  };

  React.useEffect(() => {
    if (sources.length) {
      // if selectedSourceId is not set or no longer in the sources array,
      // set the selectedSourceId to the first source
      if (
        !selectedSource ||
        !sources.map((source) => source.id).includes(selectedSource.id)
      ) {
        updateSource(sources[0].id);
      }
    }
  }, [sources]);

  const sourceList = sources.map((source) => {
    return (
      <li
        key={source.id}
        value={source.id}
        onClick={() => updateSource(source.id)}
      >
        <Button label={source.attributes.name} Icon={<SourceMenuSvg />} />
      </li>
    );
  });

  const noSourcePlaceholder = (
    <li key="no-source" value="">
      <Button label={"No sources"} />
    </li>
  );

  return (
    <div className={"ix-source-select" + (isOpen ? " ix-btn-flat" : "")}>
      <Button
        label={selectedSource?.attributes.name || "Select a Source"}
        onClick={() => setIsOpen(!isOpen)}
        type="dropdown"
        Icon={<SourceMenuSvg />}
      />
      <ul
        className={
          "ix-dropdown" + (isOpen ? " ix-dropdown-open" : " ix-dropdown-hide")
        }
      >
        {sourceList.length ? sourceList : noSourcePlaceholder}
      </ul>
    </div>
  );
}
