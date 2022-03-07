import React, { ReactElement } from "react";
import { useClickOutside } from "../../../common/hooks//useClickOutside";
import { useListSelectionBehavior } from "../../../common/hooks/useListSelectionBehavior";
import { ImgixGETSourcesData } from "../../../types";
import { IDeploymentType } from "../../../types/imgixAPITypes";
import { DownArrowSvg } from "../../icons/DownArrowSvg";
import { SourceMenuSvg } from "../../icons/SourceMenuSvg";
import { SourceTypeIcon } from "../../icons/SourceTypeIcon";
import { FrameButton } from "../FrameButton/FrameButton";
import { SourceSelectButton } from "../SourceSelectButton";
import styles from "./SourceSelect.module.scss";

interface Props {
  sources: ImgixGETSourcesData;
  selectedSource: ImgixGETSourcesData[0] | null;
  handleSelect: (sourceId: string) => void;
  requestSources: (index?: string) => Promise<void | ImgixGETSourcesData>;
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
  requestSources,
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

  const [pageIndex, setPageIndex] = React.useState("1");

  const requestNextSourcePage = () => {
    setPageIndex(String(Number(pageIndex) + 1));
    requestSources(pageIndex);
  };

  React.useEffect(() => {
    // we don't want to select the first source's assets every time the page
    // index changes, so we only do this if the page index is 0, or on the
    // first load of the sources list.
    if (sources.length && Number(pageIndex) < 1) {
      // if selectedSourceId is not set or no longer in the sources array,
      // set the selectedSourceId to the first source
      if (
        !activeSource ||
        !sources.map((source) => source.id).includes(activeSource.id)
      ) {
        updateSource(sources[0].id);
      }
    }
    // if page index > 1 then we've clicked the next page button
    // so we can assume the dropdown should stay open
    if (Number(pageIndex) > 1) {
      setIsVisible(true);
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
        <li className={styles.sourceSelectDropdownItem}>
          <FrameButton
            color="tertiary"
            frameless
            label={"Fetch more sources"}
            onClick={(e) => {
              e.preventDefault();
              requestNextSourcePage();
            }}
          />
        </li>
      </ul>
    </div>
  );
}
