import React, { Component } from "react";
import { imgixAPI } from "../../services/imgixAPIService";
import { CursorT, ImgixGETAssetsData, ImgixGETSourcesData } from "../../types";
import { IBreakoutAppOnSubmit } from "../../types/breakoutAppPublic";
import { IPaginationData } from "../Pagination/Pagination";
import { AssetBrowser } from "./AssetBrowser";

const CURSOR_PAGE_LIMIT = 14;

interface Props {
  apiKey: string | null;
  defaultSourceId?: string;
  onSelectAsset?: IBreakoutAppOnSubmit;
}

interface State {
  errors: string[];
  loading: boolean;
  sources: ImgixGETSourcesData;
  assets: ImgixGETAssetsData;
  cursor: CursorT;
  selectedSource: ImgixGETSourcesData[0] | null;
  query: string;
}

export class AssetBrowserContainer extends Component<Props, State> {
  state: State = {
    assets: [] as ImgixGETAssetsData,
    cursor: {} as CursorT,
    errors: [],
    loading: true,
    sources: [] as ImgixGETSourcesData,
    selectedSource: null,
    query: "",
  };

  /**
   * Request the sources from the imgix API
   * @returns {Promise} - A promise that resolves when the sources have been
   * fetched
   */
  requestSources = async (index: string = "0") => {
    const { apiKey, defaultSourceId } = this.props;
    //  If the API key is not set, we don't want to make a request
    if (!apiKey) {
      return;
    }
    imgixAPI.sources
      .get(apiKey, index)
      .then((resp) => {
        const selectedSource = resp.data.filter(
          (source) => source.id === defaultSourceId
        )[0];
        this.setState({
          // Set selected source if defaultSourceId is set. Will default to
          // first source if defaultSourceId is not set.
          selectedSource,
          sources: [...this.state.sources, ...resp.data],
          loading: false,
        });

        // if default source, request assets from that source
        if (defaultSourceId) {
          // find the default source from the response
          const source = resp.data.find(
            (assetSource) => assetSource.id === defaultSourceId
          );
          source && this.requestAssetsFromSource({ source });
        }
      })
      .catch((err) => {
        this.setState({
          errors: [err.message],
          loading: false,
        });
      });
  };

  /**
   *
   * @param params
   * @param params.source - the source to request assets from
   * @param [params.cursor] - the cursor to use for pagination
   * @returns {Promise} - A Promise that resolves to the assets from the source
   */
  requestAssets = async ({
    source,
    cursor,
  }: {
    source: ImgixGETSourcesData[0];
    cursor?: CursorT;
  }) => {
    const { apiKey } = this.props;
    //  If the API key is not set, we don't want to make a request
    if (!apiKey) {
      return;
    }

    return imgixAPI.sources.assets
      .get(apiKey, source.id, cursor?.current || "0")
      .then((res) => {
        this.setState({
          assets: [...res.data],
          cursor: res.cursor,
          loading: false,
        });

        if (!res.data.length) {
          throw new Error("Selected source has no assets");
        }
      })
      .catch((err) => {
        this.setState({
          errors: [err.message],
          loading: false,
        });
        console.log(err);
      });
  };

  /**
   *
   * @param source - the source to request assets form
   * @param cursor - the cursor to use for pagination
   * @param query - the query to use for filtering
   * @returns {Promise} - A Promise that resolves to the assets from the source
   * that match the query
   */
  searchForAssets = async ({
    source,
    cursor,
    query,
  }: {
    source: ImgixGETSourcesData[0];
    query: string;
    cursor?: CursorT;
  }): Promise<void> => {
    const { apiKey } = this.props;
    //  If the API key is not set, we don't want to make a request
    if (!apiKey) {
      return;
    }
    return imgixAPI.search
      .get(apiKey, source.id, query, cursor?.current || "0")
      .then((res) => {
        this.setState({
          assets: [...res.data],
          cursor: res.cursor,
          loading: false,
        });
        // raise an error if response has no data
        if (!res.data.length) {
          throw new Error("Selected source has no assets");
        }
      })
      .catch((err) => {
        this.setState({
          errors: [err.message],
          loading: false,
        });
        console.log(err);
      });
  };

  /**
   *
   * @param source - the source to request assets from
   * @param cursor - the cursor to use for pagination
   * @param query - the query to use for filtering
   * @returns {Promise} - A Promise that resolves to the assets from the source.
   * If the query is provided, the assets will be filtered by the query. If the
   * cursor is provided, the assets will be fetched from the cursor position.
   * Otherwise, the assets will be fetched from the start.
   */
  requestAssetsFromSource = async ({
    source,
    cursor,
    query,
  }: {
    source: ImgixGETSourcesData[0];
    cursor?: CursorT;
    query?: string;
  }): Promise<void> => {
    this.setLoading(true);
    if (!query || query.length === 0) {
      return this.requestAssets({ source, cursor });
    }
    if (query) {
      this.searchForAssets({ source, cursor, query });
    }
  };

  componentDidMount() {
    // fetch the sources when the component mounts
    const { apiKey } = this.props;
    const { assets } = this.state;
    if (!apiKey) {
      this.setState({
        errors: [
          `The API key set for this integration seems to be invalid.\n\nPlease ensure a valid API key is set in your Salesforce Commerce Cloud Site settings\nwhich can be found at Business Manager > [Settings Page] > imgix.`,
        ],
        loading: false,
      });
    } else if (assets.length === 0) {
      this.setState({ loading: true }, this.requestSources);
    }
  }

  // State setter helper functions, to avoid having to use setState in every
  // function that needs to update the state.

  setLoading = (loading: boolean) => {
    this.setState({ loading });
  };

  setSelectedSource = (source: ImgixGETSourcesData[0]) => {
    this.setState({ selectedSource: source });
  };

  setQuery = (query: string) => {
    this.setState({ query });
  };

  get cursorLimit() {
    return this.state.cursor.limit || CURSOR_PAGE_LIMIT;
  }

  get currentPageNumber() {
    return Math.floor(
      (Number(this.state.cursor.current) || 0) / this.cursorLimit
    );
  }

  /**
   * Handle pagination button clicks and pass the new cursor to the parent
   * @param offset - Either 1 or -1. 1 for next page, -1 for previous page
   * @returns {Promise} A promise that resolves to the new assets and cursor
   */
  handlePageChange = (offset: number) => {
    const { selectedSource, cursor, query } = this.state;
    if (!selectedSource) return;
    // update the cursor position with the offset
    const currentPage = Number(cursor.current) || 0;
    const limit = this.cursorLimit;
    const delta = offset * limit;
    const nextPageNum = currentPage + delta;
    const nextPage = String(nextPageNum);
    const newCursor = {
      ...cursor,
      current: nextPage,
      hasMore: nextPageNum < cursor.totalRecords,
    };

    // optimistically update cursor
    this.setState({ cursor: newCursor });
    // request the assets from the new cursor position
    this.requestAssetsFromSource({
      source: selectedSource,
      cursor: newCursor,
      query,
    });
  };

  handlePrevPage = () => {
    this.handlePageChange(-1);
  };

  handleNextPage = () => {
    this.handlePageChange(1);
  };

  render() {
    const {
      sources,
      assets,
      errors,
      loading,
      cursor,
      query,
      selectedSource,
    } = this.state;

    const paginationData = ((): IPaginationData => {
      const limit = this.cursorLimit;
      const current = this.currentPageNumber;
      const totalNumPages = Math.floor(cursor.totalRecords / limit);
      return {
        current: current,
        hasPrev: current > 0,
        hasNext: cursor.hasMore,
        totalNumPages,
      };
    })();

    return (
      <AssetBrowser
        errors={errors}
        loading={loading}
        sources={sources}
        assets={assets}
        paginationData={paginationData}
        onPrevPage={this.handlePrevPage}
        onNextPage={this.handleNextPage}
        query={query}
        setQuery={this.setQuery}
        setLoading={this.setLoading}
        selectedSource={selectedSource}
        setSelectedSource={this.setSelectedSource}
        requestAssetsFromSource={this.requestAssetsFromSource}
        requestSources={this.requestSources}
        onAssetClick={this.props.onSelectAsset}
      />
    );
  }
}
