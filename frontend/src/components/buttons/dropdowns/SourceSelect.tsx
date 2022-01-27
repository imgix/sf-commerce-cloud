import React, { ReactElement } from "react";
import { useClickOutside } from "../../../common/hooks//useClickOutside";
import { useListSelectionBehavior } from "../../../common/hooks/useListSelectionBehavior";
import { ImgixGETSourcesData } from "../../../types";
import { IDeploymentType } from "../../../types/imgixAPITypes";
import { DownArrowSvg } from "../../icons/DownArrowSvg";
import { SourceMenuSvg } from "../../icons/SourceMenuSvg";
import { SourceTypeIcon } from "../../icons/SourceTypeIcon";
import { SourceSelectButton } from "../SourceSelectButton";
import styles from "./SourceSelect.module.scss";

interface Props {
  sources: ImgixGETSourcesData;
  selectedSource: ImgixGETSourcesData[0] | null;
  handleSelect: (sourceId: string) => void;
  className?: string;
}

const SOURCE_MAP_DICTIONARY: { [key in IDeploymentType]: string } = {
  azure: "Azure",
  gcs: "Google Cloud",
  s3: "Amazon S3",
  webfolder: "Web Folder",
  webproxy: "Web Proxy",
};

export function SourceSelect({
  sources,
  selectedSource: activeSource,
  handleSelect,
  className,
}: Props): ReactElement {
  const updateSource = (sourceId: string) => {
    setIsVisible(false);
    handleSelect(sourceId);
  };

  const { visibleRef, setIsVisible, isVisible } = useClickOutside(false);

  const { currentSelected, handleOtherInteraction } = useListSelectionBehavior({
    items: sources,
    active: isVisible,
    onSelectCurrentItem: (item) => {
      updateSource(item.id);
    },
  });

  React.useEffect(() => {
    if (sources.length) {
      // if selectedSourceId is not set or no longer in the sources array,
      // set the selectedSourceId to the first source
      if (
        !activeSource ||
        !sources.map((source) => source.id).includes(activeSource.id)
      ) {
        updateSource(sources[0].id);
      }
    }
  }, [sources]); // eslint-disable-line react-hooks/exhaustive-deps

  const sourceList = sources.map((source) => {
    const isSelected = currentSelected && source.id === currentSelected.id;
    const isActive = activeSource && activeSource.id === source.id;
    return (
      <li
        key={source.id}
        value={source.id}
        onClick={() => updateSource(source.id)}
        className={
          (isSelected
            ? styles.selectedSource
            : isActive
            ? styles.activeSource
            : "") +
          " " +
          styles.sourceSelectDropdownItem
        }
        onMouseEnter={() => handleOtherInteraction(source)}
      >
        <div className={styles.deploymentIndicator}></div>
        <div className={styles.textContainer}>
          <div className={styles.sourceName}>{source.attributes.name}</div>
          <div className={styles.sourceType}>
            {SOURCE_MAP_DICTIONARY[source.attributes.deployment.type]}
            <SourceTypeIcon
              type={source.attributes.deployment.type}
              className={styles.sourceTypeIcon}
            />
          </div>
        </div>
      </li>
    );
  });

  const noSourcePlaceholder = (
    <li key="no-source" value="">
      <SourceSelectButton label={"No sources"} />
    </li>
  );

  return (
    <div
      className={styles.container + (className ? ` ${className}` : "")}
      ref={visibleRef}
    >
      <SourceSelectButton
        label={activeSource?.attributes.name || "Select a Source"}
        onClick={() => setIsVisible(true)}
        leftIcon={<SourceMenuSvg className={styles.sourceIcon} />}
        rightIcon={<DownArrowSvg />}
        flat={isVisible}
        className={styles.button}
        rightIconClassName={styles.rightButtonIcon}
      />
      <ul className={styles.dropdown + (isVisible ? ` ${styles.open}` : "")}>
        {sourceList.length ? sourceList : noSourcePlaceholder}
      </ul>
    </div>
  );
}
