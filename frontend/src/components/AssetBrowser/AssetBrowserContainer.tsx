import React, { Component } from "react";
import { imgixAPI } from "../../services/imgixAPIService";
import { AssetBrowser } from "./AssetBrowser";
import { ImgixGETSourcesData, ImgixGETAssetsData, CursorT } from "../../types";

interface Props {
  apiKey: string;
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
  state = {
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
  requestSources = async () => {
    imgixAPI.sources
      .get(this.props.apiKey)
      .then((resp) => {
        this.setState({
          sources: resp.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          errors: [err.message],
          loading: false,
        });
        // TODO(luis): remove this console.log
        console.log(err);
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
        // TODO(luis): remove this console.log
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
        // TODO(luis): remove this console.log
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
        errors: ["No API key provided"],
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
    return (
      <AssetBrowser
        errors={errors}
        loading={loading}
        sources={sources}
        assets={assets}
        cursor={cursor}
        query={query}
        setQuery={this.setQuery}
        setLoading={this.setLoading}
        selectedSource={selectedSource}
        setSelectedSource={this.setSelectedSource}
        requestAssetsFromSource={this.requestAssetsFromSource}
      />
    );
  }
}
