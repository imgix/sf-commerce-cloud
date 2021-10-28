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
  const [errors, setErrors] = React.useState<string[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [sources, setSources] = React.useState<ImgixGETSourcesData>([]);
  const [selectedSource, setSelectedSource] = React.useState<
    ImgixGETSourcesData[0]
  >();
  const [assets, setAssets] = React.useState<any[]>([]);

  // TODO(luis): refactor this into the searchbar container
  const handleSearchSubmit = (searchQuery: string) => {
    if (!!searchQuery && searchQuery.length > 0) {
      imgixAPI.search
        .get(apiKey, selectedSource?.id || "", searchQuery)
        .then((res) => {
          const searchAssets = res.data;
          setLoading(false);
          setAssets(searchAssets);
        })
        .catch((err) => {
          setErrors([err.response.errors[0].detail]);
          console.log(err);
        });
    }
  };

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
        setAssets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrors([err.response.errors[0].detail]);
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
      imgixAPI.sources
        .get(apiKey)
        .then((resp) => {
          setSources(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          setErrors([err.response.errors[0].detail]);
          console.log(err);
          setLoading(false);
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
  const hasErrors = errors && !!errors.length;

  const renderPlaceholder = () => {
    // TODO(luis): add tests, and refactor better handle this behavior
    // create placeholder to show when loading, selected origin has no sources,
    // or no assets are found.
    let element;

    if (!hasSources && !errors.length && !loading) {
      element = "No sources found";
    } else if (selectedSource && !hasAssets && !errors.length && !loading) {
      element = "Selected source has no assets.";
    } else if (hasErrors) {
      element = errors[0];
    } else if (loading) {
      element = <LoadingSpinner loading={loading} />;
    } else {
      element = "Select a source.";
    }
    return element;
  };

  const placeholder = renderPlaceholder();

  return (
    <div className="ix-asset-browser">
      <div className="ix-asset-title-bar-container">
        <SourceSelect sources={sources} handleSelect={handleSourceSelect} />
        <SearchBar handleSubmit={handleSearchSubmit} />
      </div>
      <AssetGrid domain={domain} assets={assets} placeholder={placeholder} />
      <div className="ix-asset-meta-information-container"></div>
    </div>
  );
}
