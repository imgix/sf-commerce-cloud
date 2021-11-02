import React, { ReactElement } from "react";
import { ImgixGETSourcesData, ImgixGETAssetsData, CursorT } from "../../types";

import { AssetGrid } from "../grids/AssetGrid";
import { SearchBar } from "../forms/search/SearchBar";
import { SourceSelect } from "../buttons/dropdowns/SourceSelect";

import "../../styles/AssetBrowser.css";
import Pagination from "../buttons/Pagination";
interface Props {
  errors: string[];
  loading: boolean;
  sources: ImgixGETSourcesData;
  assets: ImgixGETAssetsData;
  cursor: CursorT;
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
}
// TODO(luis): Refactor this component into smaller components
export function AssetBrowser({
  errors,
  loading,
  sources,
  assets,
  cursor,
  query,
  selectedSource,
  setQuery,
  setLoading,
  setSelectedSource,
  requestAssetsFromSource,
}: Props): ReactElement {
  /**
   * Handle pagination button clicks and pass the new cursor to the parent
   * @param offset - Either 1 or -1. 1 for next page, -1 for previous page
   * @returns {Promise} A promise that resolves to the new assets and cursor
   */
  const handlePageChange = (offset: number) => {
    // TODO(luis): handle undefined source better
    if (!selectedSource) return;
    // update the cursor position with the offset
    const currentPage = Number(cursor.current) || 0;
    const limit = cursor.limit || 12;
    const delta = offset * limit;
    const nextPage = "" + (currentPage + delta);
    const newCursor = { ...cursor, current: nextPage };

    // request the assets from the new cursor position
    requestAssetsFromSource({
      source: selectedSource,
      cursor: newCursor,
      query,
    });
  };

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
    // TODO(luis): add tests to better handle this behavior
    // If the source has no custom domains, return the source name as the domain
    if (!source || !source.attributes) return "";

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
        <SearchBar handleSubmit={handleSearch} />
      </div>
      <AssetGrid
        domain={domain}
        assets={assets}
        loading={loading}
        errors={errors}
      />
      <Pagination cursor={cursor} handlePageChange={handlePageChange} />
      <div className="ix-asset-meta-information-container"></div>
    </div>
  );
}
