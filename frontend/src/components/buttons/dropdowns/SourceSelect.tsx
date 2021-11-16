import React, { ReactElement } from "react";
import { ImgixGETSourcesData } from "../../../types";
import { Button } from "../Button";
import { SourceMenuSvg } from "../../icons/SourceMenuSvg";

import "../../../styles/Button.css";
import "../../../styles/SourceSelect.css";

interface Props {
  sources: ImgixGETSourcesData;
  handleSelect: (sourceId: string) => void;
}

export function SourceSelect({ sources, handleSelect }: Props): ReactElement {
  const [selectedSourceId, setSelectedSourceId] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedSource = sources.find(
    (source) => source.id === selectedSourceId
  );

  React.useEffect(() => {
    if (sources.length) {
      setSelectedSourceId(sources[0].id);
    }
  }, [sources]);

  const sourceList = sources.map((source) => {
    return (
      <li
        key={source.id}
        value={source.id}
        onClick={(e) => handleClick(source.id)}
      >
        <Button label={source.attributes.name} Icon={<SourceMenuSvg />} />
      </li>
    );
  });

  // create on click handler that closes the dropdown and sets the selected source
  const handleClick = (id: string) => {
    setIsOpen(!isOpen);
    setSelectedSourceId(id);
    handleSelect(id);
  };

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
