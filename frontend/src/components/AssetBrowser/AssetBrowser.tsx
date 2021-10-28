import React, { ReactElement } from "react";

import { AssetGrid } from "../grids/AssetGrid";
import { imgixAPI } from "../../services/imgixAPIService";
import { SearchBar } from "../forms/search/SearchBar";
import { LoadingSpinner } from "../LoadingSpinner";
import { SourceSelect } from "../buttons/dropdowns/SourceSelect";
import { ImgixGETSourcesData } from "../../types";

import "../../styles/AssetBrowser.css";

interface Props {
  apiKey: string;
}

export function AssetBrowser({ apiKey }: Props): ReactElement {
  const [loading, setLoading] = React.useState(true);
  const [sources, setSources] = React.useState<ImgixGETSourcesData>([]);
  const [selectedSource, setSelectedSource] = React.useState<
    ImgixGETSourcesData[0]
  >();
  const [assets, setAssets] = React.useState<any[]>([]);

  const handleSourceSelect = (sourceId: string) => {
    setLoading(true);
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
        setLoading(false);
        setAssets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    // if no API key is provided, don't fetch sources
    if (!apiKey) {
      setLoading(false);
    } else {
      setLoading(true);
      // fetch the sources when the component mounts
      imgixAPI.sources.get(apiKey).then((resp) => {
        setLoading(false);
        setSources(resp.data);
      });
    }
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
  const hasSources = sources && !!sources.length;
  const hasAssets = assets && !!assets.length && !!domain.length;

  // create placeholder to show when no sources or assets are available
  let placeHolderText;
  if (!hasSources) {
    placeHolderText = "No sources found";
  } else if (selectedSource && !hasAssets && !loading) {
    placeHolderText = "Selected source has no assets.";
  } else {
    placeHolderText = "Select a source.";
  }

  const placeholder =
    !loading && (!assets || !assets.length) ? (
      <div className="ix-grid">
        <div className="ix-grid ix-grid-item-placeholder ">
          <div>
            <div>{placeHolderText}</div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className="ix-asset-browser">
      <div className="ix-asset-title-bar-container">
        <SourceSelect sources={sources} handleSelect={handleSourceSelect} />
        <SearchBar />
      </div>
      <LoadingSpinner loading={loading} />
      {placeholder ? (
        placeholder
      ) : (
        <AssetGrid domain={domain} assets={assets} />
      )}
      <div className="ix-asset-meta-information-container"></div>
    </div>
  );
}
