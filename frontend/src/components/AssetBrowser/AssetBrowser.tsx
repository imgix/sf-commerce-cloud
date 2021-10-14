import React, { ReactElement } from "react";

import { AssetGridContainer } from "./AssetGridContainer";
import { imgixAPI } from "../../services/imgixAPIService";
import { SearchBar } from "../forms/search/SearchBar";
import { SourceSelect } from "../buttons/dropdowns/SourceSelect";
import { ImgixGETSourcesData } from "../../types";

import "../../styles/AssetBrowser.css";

interface Props {
  apiKey: string;
}

export function AssetBrowser({ apiKey }: Props): ReactElement {
  const [sources, setSources] = React.useState<ImgixGETSourcesData>([]);
  const [selectedSource, setSelectedSource] = React.useState<
    ImgixGETSourcesData[0]
  >();
  const [assets, setAssets] = React.useState<any[]>([]);

  const handleSourceSelect = (sourceId: string) => {
    // store the selected source and fetch its assets
    const source = sources.find(
      (currentSource) => currentSource.id === sourceId
    );
    if (!source) return;
    setSelectedSource(source);

    imgixAPI.sources.assets
      .get(apiKey, source.id)
      .then((res) => {
        // store the source' assets
        setAssets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    // fetch the sources when the component mounts
    imgixAPI.sources.get(apiKey).then((resp) => {
      setSources(resp.data);
    });
  }, [apiKey]);

  const parseSourceDomain = (source: ImgixGETSourcesData[0]) => {
    // TODO(luis): add tests to better handle this behavior
    // If the source has no custom domains, return the source name as the domain
    if (!source) return "";
    const customDomains = source?.attributes?.custom_domains;
    if (!customDomains || !customDomains.length) {
      return source.attributes.name + ".imgix.net";
    }
    // Otherwise, return the first custom domain
    return customDomains[0];
  };

  const domain = parseSourceDomain(selectedSource as ImgixGETSourcesData[0]);

  return (
    <div className="ix-asset-browser">
      <div className="ix-asset-title-bar-container">
        <SourceSelect sources={sources} handleSelect={handleSourceSelect} />
        <SearchBar />
      </div>
      <AssetGridContainer domain={domain || ""} assets={assets} />
      <div className="ix-asset-meta-information-container"></div>
    </div>
  );
}
