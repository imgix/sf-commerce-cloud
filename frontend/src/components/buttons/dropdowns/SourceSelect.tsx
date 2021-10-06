import React, { ReactElement } from "react";
import { SourcePropsT } from "../../../types";
import { Button } from "../Button";
import { SourceMenuSvg } from "../../icons/SourceMenuSvg";

import "../../../styles/Button.css";
import "../../../styles/SourceSelect.css";

interface Props {
  sources: SourcePropsT[];
}

export function SourceSelect({ sources }: Props): ReactElement {
  const [selectedSource, setSelectedSource] = React.useState(
    {} as SourcePropsT
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const sourceList = sources.map((source) => {
    return (
      <li
        key={source.id}
        value={source.id}
        onClick={(e) => setSelectedSource({ ...source })}
      >
        <Button label={source.name} Icon={<SourceMenuSvg />} />
      </li>
    );
  });
  // TODO(luis): Add an onClick handler so that when the user clicks on the
  // source an optional callback can be called.
  return (
    <div className={"ix-source-select" + (isOpen ? " ix-btn-flat" : "")}>
      <Button
        label={
          Object.keys(selectedSource).length
            ? selectedSource.name
            : "select a source"
        }
        onClick={() => setIsOpen(!isOpen)}
        type="dropdown"
        Icon={<SourceMenuSvg />}
      />
      <ul
        className={
          "ix-dropdown" + (isOpen ? " ix-dropdown-open" : " ix-dropdown-hide")
        }
      >
        {sourceList.length ? sourceList : <li>no sources</li>}
      </ul>
    </div>
  );
}
