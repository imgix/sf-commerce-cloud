import React, { ReactElement } from "react";

import { AssetGridContainer } from "./AssetGridContainer";
import { imgixAPI } from "../../services/imgixAPIService";
import { SearchBar } from "../forms/search/SearchBar";
import { SourceSelect } from "../buttons/dropdowns/SourceSelect";
import { SourceT } from "../../types";

import "../../styles/AssetBrowser.css";

interface Props {
  apiKey: string;
}

export function AssetBrowser({ apiKey }: Props): ReactElement {
  const [sources, setSources] = React.useState<SourceT[]>([]);
  const [selectedSource, setSelectedSource] = React.useState<SourceT>();
  const [assets, setAssets] = React.useState<any[]>([]);

  const handleSourceSelect = (sourceId: string) => {
    // request images from that source
    const source = sources.find(
      (currentSource) => currentSource.id === sourceId
    );
    if (!source) return;
    setSelectedSource(source);

    console.log(apiKey, source);

    imgixAPI.sources.assets
      .get(apiKey, source.id)
      .then((res) => {
        setAssets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    imgixAPI.sources.get(apiKey).then((resp) => {
      setSources(resp.data);
    });
  }, [apiKey]);

  const parseSourceDomain = (source: SourceT) => {
    if (!source) return "";
    const customDomains = source?.attributes?.custom_domains;
    if (!customDomains || !customDomains.length)
      return source.attributes.name + ".imgix.net";
  };

  const domain = parseSourceDomain(selectedSource as SourceT);
  console.log(domain);

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
