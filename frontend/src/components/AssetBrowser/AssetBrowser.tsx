import React, { ReactElement } from "react";
import { CursorT, ImgixGETAssetsData, ImgixGETSourcesData } from "../../types";
import { IBreakoutAppOnSubmit } from "../../types/breakoutAppPublic";
import { SourceSelect } from "../buttons/dropdowns/SourceSelect";
import { SearchBar } from "../forms/search/SearchBar";
import { AssetGrid, IAssetGridClickCallback } from "../grids/AssetGrid";
import { IPaginationData, Pagination } from "../Pagination/Pagination";
import styles from "./AssetBrowser.module.scss";

interface Props {
  errors: string[];
  loading: boolean;
  sources: ImgixGETSourcesData;
  assets: ImgixGETAssetsData;

  paginationData: IPaginationData;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  query: string;
  selectedSource: ImgixGETSourcesData[0] | null;
  setQuery: (input: string) => any;
  setLoading: (loading: boolean) => any;
  setSelectedSource: (source: ImgixGETSourcesData[0]) => any;
  requestAssetsFromSource: ({
    source,
    cursor,
    query,
  }: {
    source: ImgixGETSourcesData[0];
    cursor?: CursorT;
    query?: string;
  }) => Promise<void>;
  requestSources: (index?: string) => Promise<void | ImgixGETSourcesData>;
  onAssetClick?: IBreakoutAppOnSubmit;
}

export function AssetBrowser({
  errors,
  loading,
  sources,
  assets,
  paginationData,
  onPrevPage,
  onNextPage,
  query,
  selectedSource,
  setQuery,
  setLoading,
  setSelectedSource,
  requestAssetsFromSource,
  requestSources,
  onAssetClick,
}: Props): ReactElement {
  /**
   * Request the assets from the selected source
   * @param sourceId - The id of the source to request assets from
   * @returns {Promise} A promise that resolves to the new assets and cursor
   */
  const handleSourceSelect = (sourceId: string) => {
    setLoading(true);
    // store the selected source and fetch its assets
    const source = sources.find(
      (currentSource: ImgixGETSourcesData[0]) => currentSource.id === sourceId
    );
    if (!source) return;
    setSelectedSource(source);
    requestAssetsFromSource({ source });
  };

  /**
   * Handle the search bar input and pass the new query to the parent
   * @param query - The query to search for
   * @returns {Promise} A promise that resolves to the new assets and cursor
   */
  const handleSearch = (query: string) => {
    setLoading(true);
    setQuery(query);
    if (!selectedSource) return;
    requestAssetsFromSource({ source: selectedSource, query });
  };

  /**
   * Parse the domain from the source attributes
   * @param source - The source to request assets from
   * @returns {string} Either a custom source name or the default source name,
   * `<source.attribute.name>.imgix.net`
   */
  const parseSourceDomain = (source: ImgixGETSourcesData[0]) => {
    // If the source has no custom domains, return the source name as the domain
    if (!source || !source.attributes) return "";

    const customDomains = source?.attributes?.deployment.custom_domains;
    if (!customDomains || !customDomains.length) {
      return source.attributes.name + ".imgix.net";
    }
    // Otherwise, return the first custom domain
    return customDomains[0];
  };

  const domain = parseSourceDomain(selectedSource as ImgixGETSourcesData[0]);

  const handleAssetGridClick: IAssetGridClickCallback = ({
    src: assetData,
  }) => {
    if (!selectedSource || !onAssetClick) {
      return;
    }

    const originPath = assetData.attributes.origin_path;
    const originPathHasLeadingSlash = originPath.startsWith("/");

    const src = `https://${domain}${
      originPathHasLeadingSlash ? "" : "/"
    }${originPath}`;

    const data = {
      src,
      mediaWidth: assetData.attributes.media_width,
      mediaHeight: assetData.attributes.media_height,
      imgix_metadata: { ...assetData, base_url: domain },
    };

    onAssetClick(data);
  };

  return (
    <div className={styles.assetBrowser}>
      <div className={styles.assetTitleBarContainer}>
        <SourceSelect
          sources={sources}
          selectedSource={selectedSource}
          handleSelect={handleSourceSelect}
          requestSources={requestSources}
          className={styles.sourceSelect}
        />
        <div className={styles.spacer} />
        <SearchBar handleSubmit={handleSearch} />
      </div>
      <div className={styles.assetGridContainer}>
        {domain ? (
          <AssetGrid
            domain={domain}
            assets={assets}
            loading={loading}
            errors={errors}
            handleAssetGridClick={handleAssetGridClick}
          />
        ) : null}
      </div>
      <div className={styles.paginationContainer}>
        {assets.length > 0 && (
          <Pagination
            data={paginationData}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            disabled={loading}
          />
        )}
      </div>
    </div>
  );
}
